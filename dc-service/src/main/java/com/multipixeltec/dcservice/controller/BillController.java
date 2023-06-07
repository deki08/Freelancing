package com.multipixeltec.dcservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multipixeltec.dcservice.dto.BillDto;
import com.multipixeltec.dcservice.dto.BillPaymentDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.enums.BillStatus;
import com.multipixeltec.dcservice.enums.CommissionStatus;
import com.multipixeltec.dcservice.enums.PaymentStatus;
import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.exceptions.NotFoundException;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountTransaction;
import com.multipixeltec.dcservice.model.Actual_Bill;
import com.multipixeltec.dcservice.model.AgentOrAgency;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.model.BillPayment;
import com.multipixeltec.dcservice.model.Commission;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.repository.Actual_BillRepository;
import com.multipixeltec.dcservice.service.AccountService;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import com.multipixeltec.dcservice.service.BillPaymentService;
import com.multipixeltec.dcservice.service.BillService;
import com.multipixeltec.dcservice.service.CommissionService;
import com.multipixeltec.dcservice.service.PatientService;
import com.multipixeltec.dcservice.service.TestOrPackageService;
import com.multipixeltec.dcservice.service.UserService;
import com.multipixeltec.dcservice.util.SortColumn;

@RestController
@RequestMapping("api/v1")
public class BillController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private BillService billService;
	private BillPaymentService billPaymentService;
	private CommissionService commissionService;
	private PatientService patientService;
	private AccountService accountService;
	private AccountTransactionService transactionService;

	private TestOrPackageService testOrPackageService;

	public BillController(BillService billService, BillPaymentService billPaymentService,
			CommissionService commissionService, PatientService patientService, AccountService accountService,
			AccountTransactionService transactionService, TestOrPackageService testOrPackageService) {
		this.billService = billService;
		this.billPaymentService = billPaymentService;
		this.commissionService = commissionService;
		this.patientService = patientService;
		this.accountService = accountService;
		this.transactionService = transactionService;
		this.testOrPackageService = testOrPackageService;
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@PutMapping("/bill")
	public Bill save(@RequestBody BillDto billDto) {
		logger.info(billDto.toString());
		if (billDto.getPatientId() != null && billDto.getTestId() != null) {
			Optional<Patient> optionalPatient = patientService.find(billDto.getPatientId());
			if (optionalPatient.isPresent()) {
				Patient patient = optionalPatient.get();
				AgentOrAgency agentOrAgency = patient.getAgentOrAgency();
				Optional<TestOrPackage> optionalTest = testOrPackageService.find(billDto.getTestId());
				double billAmount = billDto.getAmount();
				double commissionAmount = 0.0;

				if (agentOrAgency != null) {
					if (agentOrAgency.getCommissionRate() != null && agentOrAgency.getCommissionRate() > 0) {
						commissionAmount = billAmount * agentOrAgency.getCommissionRate() / 100;
					} else {
						commissionAmount = billAmount - agentOrAgency.getCommissionAmount();
					}
				}

				Bill bill = new Bill();
				bill.setPatient(patient);
				optionalTest.ifPresent(testOrPackage -> bill.setTest(testOrPackage));
				if (agentOrAgency != null) {
					bill.setAgent(agentOrAgency);
				}
				bill.setAmount(billAmount);
				bill.setPaid(0.0);
				bill.setCommission(commissionAmount);
				bill.setStatus(BillStatus.GENERATED);
				Bill savedBill = billService.save(bill);
				if (commissionAmount > 0) {
					Commission commission = new Commission();
					commission.setBill(savedBill);
					commission.setAmount(commissionAmount);
					commission.setPaid(0.0);
					commission.setDue(commissionAmount);
					commission.setStatus(CommissionStatus.PAYMENT_DUE);
					commission.setAgentOrAgency(agentOrAgency);
					commissionService.save(commission);
				}
				return savedBill;
			}
		}
		throw new NotFoundException("Patient Or Test Not Found!");
	}

	@GetMapping("/bill/{id}")
	public Optional<Bill> getById(@PathVariable(value = "id") Long id) {
		return billService.find(id);
	}

	@GetMapping("/bill")
	public List<Bill> getAll() {
		return billService.findAll();
	}

	@DeleteMapping("/bill/{id}")
	public void deleteById(@PathVariable(value = "id") Long id) {
		billService.delete(id);
	}

	@DeleteMapping("/bill")
	public void deleteAll() {
		billService.deleteAll();
	}

	@GetMapping("/bill/count")
	public long count() {
		return billService.count();
	}

	@PostMapping("/bill/advanced")
	public PageDetails advanced(@RequestBody PageDetails page) {
		Sort sort = SortColumn.bill(page.getColumn(), page.getSort());
		Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
		Page<Bill> billPage = null;
		if (page.getText() == null || page.getText().isEmpty()) {
			billPage = billService.findAllByDate(page, pageable);
		} else {
			billPage = billService.findAllByDateAndText(page, pageable);
		}
		page.setData(billPage.getContent());
		page.setTotal(billPage.getTotalElements());
		return page;
	}

	@PostMapping("/bill/advanced/agency")
	public PageDetails advancedAgency(@RequestBody PageDetails page) {
		String type = AgentAgency.AGENCY.name();
		Sort sort = SortColumn.bill(page.getColumn(), page.getSort());
		Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
		Page<Bill> billPage = null;
		if (page.getText() == null || page.getText().isEmpty()) {
			billPage = billService.findAllByAgentTypeAndDate(type, page, pageable);
		} else {
			billPage = billService.findAllByAgentTypeAndDateAndText(type, page, pageable);
		}
		page.setData(billPage.getContent());
		page.setTotal(billPage.getTotalElements());
		return page;
	}

	@PostMapping("/bill/advanced/agent")
	public PageDetails advancedAgent(@RequestBody PageDetails page) {
		String type = AgentAgency.AGENT.name();
		Sort sort = SortColumn.bill(page.getColumn(), page.getSort());
		Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
		Page<Bill> billPage = null;
		if (page.getText() == null || page.getText().isEmpty()) {
			billPage = billService.findAllByAgentTypeAndDate(type, page, pageable);
		} else {
			billPage = billService.findAllByAgentTypeAndDateAndText(type, page, pageable);
		}
		page.setData(billPage.getContent());
		page.setTotal(billPage.getTotalElements());
		return page;
	}

	@GetMapping("/bill/{id}/patient")
	public List<Bill> getAllByPatient(@PathVariable(value = "id") Long id) {
		return billService.findAllByPatient(id);
	}

	@Autowired
	UserService userService;
	@Autowired
	private Actual_BillRepository actual_BillRepository;

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@PostMapping("/bill/{id}/pay")
	public Bill payBill(@RequestBody BillPaymentDto paymentDto) {
		Optional<Bill> optionalBill = billService.find(paymentDto.getBillId());
		if (optionalBill.isPresent()) {
			Bill bill = optionalBill.get();

			System.out.println("Called...............");

			Optional<Account> accountOptional = accountService.find(paymentDto.getAccountId());
			BillPayment payment = new BillPayment();
			accountOptional.ifPresent(account -> payment.setAccount(account));
			payment.setBill(bill);
			payment.setAmount(paymentDto.getAmount());
			payment.setStatus(PaymentStatus.PAID);
			payment.setUpdateBy(paymentDto.getName());
			billPaymentService.save(payment);

			Optional<Actual_Bill> billList = actual_BillRepository.findByPatientId(bill.getRegNo());
			if (billList.isPresent()) {
				Actual_Bill actBill = billList.get();
				actBill.setRecieved(0.0);
				actBill.setPaid(actBill.getPaid() + paymentDto.getAmount());
				actBill.setDue(actBill.getNetAmount()- actBill.getPaid());
				actual_BillRepository.save(actBill);
			}
			bill.addPayment(payment.getAmount());
			bill.setPaidByName(paymentDto.getName());
			Bill savedBill = billService.save(bill);
//			Operator operator1 = 	operatorReposiory.save(operator);

			AccountTransaction transaction = new AccountTransaction();
			transaction.setAccount(payment.getAccount());
			transaction.setAmount(paymentDto.getAmount());
			transaction.setReferenceNumber(bill.getId().toString());
			transaction.setType(TransactionType.CREDIT);
			transaction.setReferenceTo(ReferenceTo.BILL);
			transactionService.save(transaction);
			CommissionStatus commissionStatus;
			if (bill.getStatus() == BillStatus.PAID) {
				commissionStatus = CommissionStatus.CLIENT_FULLY_PAID;
			} else if (bill.getStatus() == BillStatus.PARTIALLY_PAID) {
				commissionStatus = CommissionStatus.CLIENT_PARTIALLY_PAID;
			} else {
				commissionStatus = CommissionStatus.PAYMENT_DUE;
			}
			Set<Commission> commissions = bill.getCommissions();
			for (Commission commission : commissions) {
				commission.setStatus(commissionStatus);
			}
			commissionService.saveAll(commissions.stream().collect(Collectors.toList()));
			return bill;
		} else {
			throw new NotFoundException("Bill Not Found!");
		}

	}

}
