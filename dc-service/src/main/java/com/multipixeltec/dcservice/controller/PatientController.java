package com.multipixeltec.dcservice.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.multipixeltec.dcservice.dto.ImageDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.dto.updateStatusDto;
import com.multipixeltec.dcservice.enums.ActiveStatus;
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
import com.multipixeltec.dcservice.model.FingerprintRecord;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.PatientReport;
import com.multipixeltec.dcservice.model.ReportedValue;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.repository.Actual_BillRepository;
import com.multipixeltec.dcservice.service.AccountService;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import com.multipixeltec.dcservice.service.AgentOrAgencyService;
import com.multipixeltec.dcservice.service.BillPaymentService;
import com.multipixeltec.dcservice.service.BillService;
import com.multipixeltec.dcservice.service.CommissionService;
import com.multipixeltec.dcservice.service.DiagnosticReportService;
import com.multipixeltec.dcservice.service.FingerprintRecordService;
import com.multipixeltec.dcservice.service.PatientReportService;
import com.multipixeltec.dcservice.service.PatientService;
import com.multipixeltec.dcservice.service.ReportedValueService;
import com.multipixeltec.dcservice.service.TestOrPackageService;
import com.multipixeltec.dcservice.util.FileService;
import com.multipixeltec.dcservice.util.SortColumn;

@RestController
@RequestMapping("api/v1")
public class PatientController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final PatientService patientService;
	private final TestOrPackageService testOrPackageService;
	private final AgentOrAgencyService agentOrAgencyServicentService;
	private final PatientReportService patientReportService;
	private final BillService billService;
	private final FileService fileService;
	private final CommissionService commissionService;
	private final DiagnosticReportService diagnosticReportService;
	private final FingerprintRecordService fingerprintRecordService;
	private final AccountService accountService;
	private final BillPaymentService billPaymentService;
	private final AccountTransactionService transactionService;
	@Value("${application.protocol}")
	private String protocol;

	@Autowired
	private ReportedValueService reportedValueService;

	@Autowired
	private Actual_BillRepository actual_BillRepository;

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
	private SimpleDateFormat sdfMini = new SimpleDateFormat("YYMM");
	private DateTimeFormatter abbrFormatter = DateTimeFormatter.ofPattern("YYMM");
	private DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("YYYY-MM");

	public PatientController(PatientService patientService, TestOrPackageService testOrPackageService,
			AgentOrAgencyService agentOrAgencyServicentService, PatientReportService patientReportService,
			BillService billService, FileService fileService, CommissionService commissionService,
			DiagnosticReportService diagnosticReportService, FingerprintRecordService fingerprintRecordService,
			AccountService accountService, BillPaymentService billPaymentService,
			AccountTransactionService transactionService) {
		this.patientService = patientService;
		this.testOrPackageService = testOrPackageService;
		this.agentOrAgencyServicentService = agentOrAgencyServicentService;
		this.patientReportService = patientReportService;
		this.billService = billService;
		this.fileService = fileService;
		this.commissionService = commissionService;
		this.diagnosticReportService = diagnosticReportService;
		this.fingerprintRecordService = fingerprintRecordService;
		this.accountService = accountService;
		this.billPaymentService = billPaymentService;
		this.transactionService = transactionService;
	}

	private String generateRegNo(String abb) {
		Date today = new Date();
		String dateAbbr = sdfMini.format(today);
		long count = patientService.countByMonth(sdf.format(today));
		String countAbbr = String.format("%04d", count + 1);
		return abb.toUpperCase().concat(dateAbbr).concat(countAbbr);
	}


//    @Transactional(Transactional.TxType.REQUIRES_NEW)
	@PostMapping("/patient")
	public Patient save(@RequestBody Patient patient) {
		patient.setStatus(ActiveStatus.ACTIVE);
		boolean isNewRecord = false;
		String abbreviation = "";
		if (patient.getId() == null) {
			isNewRecord = true;
		} else {
			Optional<Patient> optionalPatient = patientService.find(patient.getId());
			optionalPatient.ifPresent(patient1 -> patient.setReport(patient1.getReport()));
		}
		if (patient.getTestOrPackageId() != null) {
			Optional<TestOrPackage> optionalPackage = testOrPackageService.find(patient.getTestOrPackageId());
			if (optionalPackage.isPresent()) {
				TestOrPackage aPackage = optionalPackage.get();
				patient.setTestOrPackage(aPackage);
				abbreviation = aPackage.getAbbreviation() == null ? "" : aPackage.getAbbreviation().toUpperCase();
			}
		}
		if (patient.getAgentOrAgencyId() != null) {
			Optional<AgentOrAgency> agent = agentOrAgencyServicentService.find(patient.getAgentOrAgencyId());
			agent.ifPresent(agent1 -> patient.setAgentOrAgency(agent1));
		}

		if (isNewRecord) {
			patient.setRegNo(generateRegNo(abbreviation));
		}
		patient.setCurrentStatus("Under Process");
		Patient savedRecord = patientService.save(patient);

		if (patient.getFingerId() != null && patient.getFingerId() != 0) {
			Optional<FingerprintRecord> fingerprintRecord = fingerprintRecordService.find(patient.getFingerId());
			if (fingerprintRecord.isPresent()) {
				FingerprintRecord finger = fingerprintRecord.get();
				finger.setUserId(savedRecord.getId());
				finger.setImagePath(patient.getFingerPrint());
				fingerprintRecordService.save(finger);
			}
		}

		if (isNewRecord) {
			PatientReport report = new PatientReport();
			Optional<ReportedValue> values = reportedValueService.findAll();
			report.setDefault(values.get());
			report.setPatient(savedRecord);
			patientReportService.save(report);
			patientReportService.saveMalasiyaReport(patient);
			AgentOrAgency agentOrAgency = patient.getAgentOrAgency();
			double billAmount = savedRecord.getTestOrPackage().getPrice();
			double commissionAmount = 0.0;
			if (agentOrAgency != null) {
				if (agentOrAgency.getCommissionRate() != null && agentOrAgency.getCommissionRate() > 0) {
					commissionAmount = billAmount * agentOrAgency.getCommissionRate() / 100;
				} else if (agentOrAgency.getCommissionAmount() != null && agentOrAgency.getCommissionAmount() > 0) {
					commissionAmount = billAmount - agentOrAgency.getCommissionAmount();
				}
			}

			Bill bill = new Bill();
			bill.setPatient(savedRecord);
			bill.setTest(savedRecord.getTestOrPackage());
			bill.setAgent(savedRecord.getAgentOrAgency());
			bill.setAmount(savedRecord.getTestOrPackage().getPrice());
			bill.setPaid(0.0);
			bill.setStatus(BillStatus.GENERATED);
			bill.setCommission(commissionAmount);
			bill.setPaidByName(savedRecord.getAddedby());
			Bill savedBill = billService.save(bill);


			Actual_Bill actual_Bill = new Actual_Bill();
			actual_Bill.setPatientId(savedRecord.getRegNo());
			actual_Bill.setName(savedRecord.getFullName());
			actual_Bill.setDate(new Date());
			actual_Bill.setAgency(savedRecord.getAgentOrAgencyName());
			actual_Bill.setTravellingTo(savedRecord.getTravelingTo());
			actual_Bill.setPackageName(savedRecord.getTestOrPackageName());
			actual_Bill.setRecieved(0.0);
			actual_Bill.setNetAmount(savedRecord.getTestOrPackage().getPrice());
			actual_Bill.setCommision(bill.getCommission());
			
			
			

			if (patient.getPayNow()) {
				Optional<Account> accountOptional = accountService.findAll().stream().findFirst();
				BillPayment payment = new BillPayment();
				accountOptional.ifPresent(account -> payment.setAccount(account));
				payment.setBill(savedBill);
				payment.setAmount(savedBill.getAmount());
				payment.setStatus(PaymentStatus.PAID);
				payment.setUpdateBy(savedRecord.getAddedby());
				billPaymentService.save(payment);
				savedBill.addPayment(payment.getAmount());
				billService.save(savedBill);
				actual_Bill.setPaid(savedRecord.getTestOrPackage().getPrice());
				actual_Bill.setDue(0.0);
//				actual_Bill.set

				AccountTransaction transaction = new AccountTransaction();
				transaction.setAccount(payment.getAccount());
				transaction.setAmount(payment.getAmount());
				transaction.setReferenceNumber(bill.getId().toString());
				transaction.setType(TransactionType.CREDIT);
				transaction.setReferenceTo(ReferenceTo.BILL);
				transactionService.save(transaction);
			}else {
				actual_Bill.setDue(bill.getDue());
				actual_Bill.setPaid(bill.getPaid());
			}
			actual_BillRepository.save(actual_Bill);

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

			/*
			 * if (patient.getTestOrPackage().getType() == TestPackage.PACKAGE) {
			 * List<DiagnosticReport> reports = new ArrayList<>(); for (PackageItem
			 * packageItem : patient.getTestOrPackage().getPackageItems()) {
			 * DiagnosticReport diagnosticReport = new DiagnosticReport();
			 * diagnosticReport.setPatient(patient);
			 * diagnosticReport.setTest(packageItem.getTest());
			 * diagnosticReport.setStatus(ReportStatus.PENDING);
			 * reports.add(diagnosticReport); } diagnosticReportService.saveAll(reports);
			 * }else { DiagnosticReport diagnosticReport = new DiagnosticReport();
			 * diagnosticReport.setPatient(patient);
			 * diagnosticReport.setTest(patient.getTestOrPackage());
			 * diagnosticReport.setStatus(ReportStatus.PENDING);
			 * diagnosticReportService.save(diagnosticReport); }
			 */
		}
		return savedRecord;
	}

	@GetMapping("/patient/{id}")
	public Optional<Patient> getById(@PathVariable(value = "id") Long id) {
		return patientService.find(id);
	}

	@GetMapping("/patient/search")
	public List<Patient> search(@RequestParam(value = "text") String text) {
		Pageable pageable = PageRequest.of(0, 6, Sort.by("ID").descending());
		return patientService.searchByText(text, pageable);
	}

	@GetMapping("/patient")
	public List<Patient> getAll() {
		return patientService.findAll();
	}

	@DeleteMapping("/patient/{id}")
	public void deleteById(@PathVariable(value = "id") Long id) {
		patientService.delete(id);

	}

	@DeleteMapping("/patient")
	public void deleteAll() {
		patientService.deleteAll();
	}

	@GetMapping("/patient/count")
	public long count() {
		return patientService.count();
	}

	@PostMapping("/patient/advanced")
	public PageDetails getAll(@RequestBody PageDetails page) {
		Sort sort = SortColumn.patient(page.getColumn(), page.getSort());
		Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
		Page<Patient> patientPage;
		if (page.getText() == null || page.getText().isEmpty()) {
			patientPage = patientService.findAllByDate(page, pageable);
		} else {
			patientPage = patientService.findAllByDateAndText(page, pageable);
		}
		page.setData(patientPage.getContent());
		page.setTotal(patientPage.getTotalElements());
		return page;
	}

	@PostMapping(path = "/patient/profile")
	public String uploadProfile(@RequestBody ImageDto imageDto, @RequestHeader(HttpHeaders.HOST) String host) {
		String file = protocol + host.concat("/resource/")
				+ fileService.saveFile("patient", imageDto.getFileContentBase64());
		logger.info(file);
		return file;
	}

	@PostMapping(path = "/patient/finger")
	public String uploadFinger(@RequestBody ImageDto imageDto, @RequestHeader(HttpHeaders.HOST) String host,
			HttpServletRequest request) {
		String test = request.getRemoteUser();
		String imageUrl = protocol + host.concat("/resource/")
				+ fileService.saveFile("finger", imageDto.getFileContentBase64());
		Optional<Patient> optionalPatient = patientService.find(imageDto.getId());
		if (optionalPatient.isPresent()) {
			Patient patient = optionalPatient.get();
			patient.setFingerPrint(imageUrl);
			patientService.save(patient);
			Optional<FingerprintRecord> recordOptional = fingerprintRecordService.find(imageDto.getFingerId());
			if (recordOptional.isPresent()) {
				FingerprintRecord record = recordOptional.get();
				record.setImagePath(imageUrl);
				record.setUserId(patient.getId());
				fingerprintRecordService.save(record);
			}
		}
		return imageUrl;
	}

	@PostMapping(path = "/patient/{id}/profile")
	public String uploadPatientProfile(@PathVariable("id") Long id, @RequestBody ImageDto imageDto,
			@RequestHeader(HttpHeaders.HOST) String host) {
		Optional<Patient> optional = patientService.find(id);
		String file = "";
		if (optional.isPresent()) {
			file = protocol + host.concat("/resource/")
					+ fileService.saveFile("patient", imageDto.getFileContentBase64());
			Patient patient = optional.get();
			patient.setPhoto(file);
			patientService.save(patient);
		}
		return file;
	}

	@PostMapping(path = "/patient/{id}/finger")
	public String uploadPatientFinger(@PathVariable("id") Long id, @RequestBody ImageDto imageDto,
			@RequestHeader(HttpHeaders.HOST) String host) {
		Optional<Patient> optional = patientService.find(id);
		String file = "";
		if (optional.isPresent()) {
			file = protocol + host.concat("/resource/")
					+ fileService.saveFile("finger", imageDto.getFileContentBase64());
			Patient patient = optional.get();
			patient.setFingerPrint(file);
			patientService.save(patient);
		}
		return file;
	}

	@PostMapping(path = "/patient/{id}/xray")
	public String uploadPatientXray(@PathVariable("id") Long id, @RequestBody ImageDto imageDto,
			@RequestHeader(HttpHeaders.HOST) String host) {
		Optional<Patient> optional = patientService.find(id);
		String file = "";
		if (optional.isPresent()) {
			file = protocol + host.concat("/resource/") + fileService.saveFile("xray", imageDto.getFileContentBase64());
			PatientReport report = optional.get().getReport();
			report.setXRayImage(file);
			patientReportService.save(report);
		}
		return file;
	}

	@GetMapping("/patient/{passportNumber}/passport")
	public Patient getById(@PathVariable(value = "passportNumber") String passport) {
		List<Patient> patients = patientService.findByPassport(passport);
		if (patients == null || patients.size() == 0) {
			throw new NotFoundException("Patient Report Not Found For Given Passport Number");
		}
		return patients.get(0);
	}

	@GetMapping(path = "/patient/fixRegNumbers")
	public String regNumberFix() {
		LocalDate patternChangeDate = LocalDate.parse("2023-03-19");
		LocalDate startDate = LocalDate.parse("2023-02-01");
		LocalDate endDate = LocalDate.now();
		for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusMonths(1)) {
			String dateString = monthFormatter.format(date);
			logger.info(dateString);
			List<Patient> patients = patientService.findAllByMonth(dateString);
			for (int i = 0; i < patients.size(); i++) {
				Patient patient = patients.get(i);
				logger.info(patient.getFullName());
				LocalDate createdDate = patient.getCreatedDate().toInstant().atZone(ZoneId.systemDefault())
						.toLocalDate();
				if (createdDate.isBefore(patternChangeDate)) {
					patient.setRegNo(String.format("P%06d", patient.getId()));
				} else {
					String abb = patient.getTestOrPackage().getAbbreviation();
					String dateAbbr = abbrFormatter.format(date);
					logger.info(dateAbbr);
					String countAbbr = String.format("%04d", i + 1);
					patient.setRegNo(abb.toUpperCase().concat(dateAbbr).concat(countAbbr));
				}
			}
			patientService.saveAll(patients);
		}
		return "Done";
	}

	@PostMapping("update/status")
	public String updateStatusByPatientId(@RequestBody updateStatusDto id) {
		System.out.println(id.toString());
		System.out.println(id.getStatus());
		return patientService.updateStatus(id);

	}
}
