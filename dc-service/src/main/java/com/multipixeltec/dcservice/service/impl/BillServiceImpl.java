package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.BillUpdateDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.repository.BillRepository;
import com.multipixeltec.dcservice.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class BillServiceImpl implements BillService {

	@Autowired
	private BillRepository billRepository;

	@Override
	public Bill save(Bill bill) {
		return billRepository.save(bill);
	}

	@Override
	public Optional<Bill> find(Long id) {
		return billRepository.findById(id);
	}

	@Override
	public List<Bill> findAll() {
		return billRepository.findAll();
	}

	@Override
	public List<Bill> findAll(Sort sort) {
		return billRepository.findAll(sort);
	}

	@Override
	public Page<Bill> findAll(Pageable pageable) {
		return billRepository.findAll(pageable);
	}

	@Override
	public void delete(Long id) {
		billRepository.deleteById(id);
	}

	@Override
	public void delete(Bill bill) {
		billRepository.delete(bill);
	}

	@Override
	public void deleteAll() {
		billRepository.deleteAll();
	}

	@Override
	public long count() {
		return billRepository.count();
	}

	@Override
	public Page<Bill> findAllByDate(PageDetails page, Pageable pageable) {
		return billRepository.billService(page, pageable);
	}

	@Override
	public Page<Bill> findAllByDateAndText(PageDetails page, Pageable pageable) {
		return billRepository.findAllByDateAndText(page, pageable);
	}

	@Override
	public List<Bill> findAllByPatient(Long id) {
		return billRepository.findAllByPatient(id);
	}

	@Override
	public Page<Bill> findAllByAgentTypeAndDate(String type, PageDetails page, Pageable pageable) {
		return billRepository.findAllByAgentTypeAndDate(type, page, pageable);
	}

	@Override
	public Page<Bill> findAllByAgentTypeAndDateAndText(String type, PageDetails page, Pageable pageable) {
		return billRepository.findAllByAgentTypeAndDateAndText(type, page, pageable);
	}

	@Override
	public Double findBillAmountByDate(PageDetails page) {
		return billRepository.findBillAmountByDate(page);
	}

	@Override
	public Double findBillTotalByDate(String date) {
		return billRepository.findBillTotalByDate(date);
	}

	@Override
	public Bill updateBill(BillUpdateDto billUpdateDto) {
		// TODO Auto-generated method stub
		if (billUpdateDto.getValueType().equalsIgnoreCase("agentOrAgencyName")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("commission")) {
			Optional<Bill> billList = billRepository.findById(billUpdateDto.getPatientId());
			if (billList.isPresent()) {
				Bill bill = billList.get();
				bill.setCommission(Double.valueOf(billUpdateDto.getUpdateMoney()));
				billRepository.save(bill);
			}
		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("due")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("patientName")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("createdDate")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("qr")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("testName")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("amount")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("testPrice")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("paid")) {

		}
		if (billUpdateDto.getValueType().equalsIgnoreCase("remarks")) {

		}

		return null;
	}

}
