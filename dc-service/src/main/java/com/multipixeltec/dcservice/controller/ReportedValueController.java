package com.multipixeltec.dcservice.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multipixeltec.dcservice.model.ReportedValue;
import com.multipixeltec.dcservice.service.ReportedValueService;


@RestController
@RequestMapping("api/v1")
public class ReportedValueController {

	@Autowired
	private ReportedValueService reportedValueService;

	@PostMapping("/report-value")
	public ReportedValue reportedValue(@RequestBody ReportedValue reportedValue) {

		Optional<ReportedValue> values = reportedValueService.findAll();
		if (values.isPresent()) {
			ReportedValue reportedValue1 = values.get();
			reportedValue.setId(reportedValue1.getId());
		}
		return reportedValueService.addReportedValue(reportedValue);
	}

	@GetMapping("/report-value")
	public ReportedValue getAll() {
		Optional<ReportedValue> values = reportedValueService.findAll();

		return values.get();
	}

}
