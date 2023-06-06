package com.multipixeltec.dcservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multipixeltec.dcservice.dto.ActualDTO;
import com.multipixeltec.dcservice.dto.BillUpdateDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.model.Actual_Bill;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.service.actual_bill_service;
import com.multipixeltec.dcservice.util.SortColumn;

@RestController
@RequestMapping("api/v1")
public class ActualBillController {

	@Autowired
	private actual_bill_service actual_bill_service;

	@PostMapping("/actual-bill/advanced")
	public PageDetails advanced(@RequestBody PageDetails page) {
		Sort sort = SortColumn.bill(page.getColumn(), page.getSort());
		Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
		Page<Actual_Bill> billPage = null;
		if (page.getText() == null || page.getText().isEmpty()) {
			billPage = actual_bill_service.findAllByDate(page, pageable);
		} else {
			billPage = actual_bill_service.findAllByDateAndText(page, pageable);
		}
		page.setData(billPage.getContent());
		page.setTotal(billPage.getTotalElements());
		return page;
	}

	@PutMapping("/actual-bill/advanced")
	public Actual_Bill updateBill(@RequestBody BillUpdateDto billUpdateDto) {
		System.out.println(billUpdateDto.toString());
		return actual_bill_service.updateBill(billUpdateDto);

	}

	@PostMapping("/actual-bill/filter")
	public ActualDTO getAdvance(@RequestBody ActualDTO page) {
		Sort sort = SortColumn.bill(page.getColumn(), page.getSort());
		Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
		Page<Actual_Bill> billPage = null;
		if (page.getText() == null || page.getText().isEmpty()) {
			billPage = actual_bill_service.findByDoubleText(page, pageable);
		}
		page.setData(billPage.getContent());
		page.setTotal(billPage.getTotalElements());
		return page;
	}

}
