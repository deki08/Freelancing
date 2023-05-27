package com.multipixeltec.dcservice.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multipixeltec.dcservice.model.ReportedValue;
import com.multipixeltec.dcservice.repository.ReportedValueRepository;
import com.multipixeltec.dcservice.service.ReportedValueService;

@Service
public class reportedValueServiceImpl implements ReportedValueService {

	@Autowired
	ReportedValueRepository reportedValueRepository;

	@Override
	public ReportedValue addReportedValue(ReportedValue reportedValue) {
		// TODO Auto-generated method stub
		return reportedValueRepository.save(reportedValue);

	}

	@Override
	public Optional<ReportedValue> findAll() {
		// TODO Auto-generated method stub
		return reportedValueRepository.findById(1L);
	}

}
