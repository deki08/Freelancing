package com.multipixeltec.dcservice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.multipixeltec.dcservice.dto.BillUpdateDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Actual_Bill;
import com.multipixeltec.dcservice.model.Bill;

public interface actual_bill_service {

	Page<Actual_Bill> findAllByDate(PageDetails page, Pageable pageable);

	Page<Actual_Bill> findAllByDateAndText(PageDetails page, Pageable pageable);

	Actual_Bill updateBill(BillUpdateDto billUpdateDto);

}
