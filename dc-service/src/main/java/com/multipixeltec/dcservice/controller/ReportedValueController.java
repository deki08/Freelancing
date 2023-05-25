package com.multipixeltec.dcservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multipixeltec.dcservice.model.RefValue;
import com.multipixeltec.dcservice.model.ReportedValue;
import com.multipixeltec.dcservice.service.ReportedValueService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("api/v1")
public class ReportedValueController {

	@Autowired
	private ReportedValueService reportedValueService;

	@PostMapping("/report-value")
	public ReportedValue reportedValue(@RequestBody ReportedValue reportedValue) {

		List<ReportedValue> values = reportedValueService.findAll();
		if (values != null && values.size() != 0) {
			reportedValue.setId(values.get(0).getId());
		}
		return reportedValueService.addReportedValue(reportedValue);
	}

	@GetMapping("/report-value")
	public ReportedValue getAll() {
		List<ReportedValue> values = reportedValueService.findAll();
		return values.get(0);
	}

}
