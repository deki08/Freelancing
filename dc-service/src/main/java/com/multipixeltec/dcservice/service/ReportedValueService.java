package com.multipixeltec.dcservice.service;

import java.util.Optional;

import com.multipixeltec.dcservice.model.ReportedValue;

public interface ReportedValueService {

	ReportedValue addReportedValue(ReportedValue reportedValue);

	Optional<ReportedValue> findAll();

}
