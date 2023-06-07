package com.multipixeltec.dcservice.service.impl;

import java.sql.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.multipixeltec.dcservice.dto.ActualDTO;
import com.multipixeltec.dcservice.dto.BillUpdateDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Actual_Bill;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.repository.Actual_BillRepository;
import com.multipixeltec.dcservice.service.actual_bill_service;

@Service
public class Actual_Bill_ServiceImpl implements actual_bill_service {

	@Autowired
	private Actual_BillRepository actual_BillRepository;

	@Override
	public Page<Actual_Bill> findAllByDate(PageDetails page, Pageable pageable) {
		// TODO Auto-generated method stub
		return actual_BillRepository.findAllByDate(page, pageable);
	}

	@Override
	public Page<Actual_Bill> findAllByDateAndText(PageDetails page, Pageable pageable) {
		// TODO Auto-generated method stub
		return actual_BillRepository.findAllByDateAndText(page, pageable);
	}

	@Override
	public Actual_Bill updateBill(BillUpdateDto billUpdateDto) {
		// TODO Auto-generated method stub
		Optional<Actual_Bill> billList = actual_BillRepository.findById(billUpdateDto.getPatientId());

		if (billList.isPresent()) {
			Actual_Bill bill = billList.get();
			if (billUpdateDto.getValueType().equalsIgnoreCase("agency")) {
				bill.setAgency(billUpdateDto.getUpdateMoney());
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("commision")) {
				billUpdateDto.setUpdateMoney(billUpdateDto.getUpdateMoney().replace(",", ""));
				bill.setDue(Double.valueOf(billUpdateDto.getUpdateMoney()) + bill.getDue());
				bill.setCommision(Double.valueOf(billUpdateDto.getUpdateMoney()));
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("due")) {
				billUpdateDto.setUpdateMoney(billUpdateDto.getUpdateMoney().replace(",", ""));
				bill.setNetAmount(Double.valueOf(billUpdateDto.getUpdateMoney() + bill.getNetAmount()));
				bill.setDue(Double.valueOf(billUpdateDto.getUpdateMoney()));
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("name")) {
				bill.setName(billUpdateDto.getUpdateMoney());
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("date")) {
				bill.setDate(Date.valueOf(billUpdateDto.getUpdateMoney()));
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("travellingTo")) {
				bill.setTravellingTo(billUpdateDto.getUpdateMoney());
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("packageName")) {
				bill.setPackageName(billUpdateDto.getUpdateMoney());
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("recieved")) {
				billUpdateDto.setUpdateMoney(billUpdateDto.getUpdateMoney().replace(",", ""));
				bill.setRecieved(Double.valueOf(billUpdateDto.getUpdateMoney()));
				bill.setPaid(bill.getRecieved() + bill.getPaid());
				if (bill.getPaid() < bill.getNetAmount()) {
					bill.setDue(bill.getNetAmount()-bill.getPaid());
				}
				else {
					bill.setCommision(bill.getPaid()-bill.getNetAmount());
					bill.setDue(0.0);
				}
				
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("netAmount")) {
				billUpdateDto.setUpdateMoney(billUpdateDto.getUpdateMoney().replace(",", ""));
				if (Double.valueOf(billUpdateDto.getUpdateMoney()) >= bill.getNetAmount()) {
					Double newVal = Double.valueOf(billUpdateDto.getUpdateMoney()) - bill.getNetAmount();
					bill.setDue(newVal);
					bill.setNetAmount(Double.valueOf(billUpdateDto.getUpdateMoney()));
				} else {
					bill.setCommision(bill.getNetAmount() - Double.valueOf(billUpdateDto.getUpdateMoney()));
					bill.setNetAmount(Double.valueOf(billUpdateDto.getUpdateMoney()));
				}
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("paid")) {
				billUpdateDto.setUpdateMoney(billUpdateDto.getUpdateMoney().replace(",", ""));

				if (Double.valueOf(billUpdateDto.getUpdateMoney()) < bill.getNetAmount()) {
					bill.setDue(bill.getNetAmount() - Double.valueOf(billUpdateDto.getUpdateMoney()));
					bill.setPaid(Double.valueOf(billUpdateDto.getUpdateMoney()));
				} else {
					bill.setPaid(Double.valueOf(billUpdateDto.getUpdateMoney()));
				}
			}
			if (billUpdateDto.getValueType().equalsIgnoreCase("remarks")) {
				bill.setRemarks(billUpdateDto.getUpdateMoney());

			}
			actual_BillRepository.save(bill);
		}
		return null;
	}

	@Override
	public Page<Actual_Bill> findByDoubleText(ActualDTO page, Pageable pageable) {
		// TODO Auto-generated method stub
		return actual_BillRepository.findByDoubleText(page, pageable);
	}

	@Override
	public Page<Actual_Bill> findBySingleText1(ActualDTO page, Pageable pageable) {
		// TODO Auto-generated method stub
		return actual_BillRepository.findBySingleText1(page, pageable);
	}

	@Override
	public Page<Actual_Bill> findBySingleText2(ActualDTO page, Pageable pageable) {
		// TODO Auto-generated method stub
		return actual_BillRepository.findBySingleText2(page, pageable);
	}

}
