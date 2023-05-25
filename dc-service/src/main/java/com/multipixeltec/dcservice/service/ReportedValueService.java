package com.multipixeltec.dcservice.service;

import java.util.List;

import com.multipixeltec.dcservice.model.ReportedValue;

public interface ReportedValueService {

	ReportedValue addReportedValue(ReportedValue reportedValue);

	List<ReportedValue> findAll();

}
