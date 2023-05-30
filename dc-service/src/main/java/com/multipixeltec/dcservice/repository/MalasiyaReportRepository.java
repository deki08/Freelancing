package com.multipixeltec.dcservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multipixeltec.dcservice.model.MalasiyaReport;

public interface MalasiyaReportRepository extends JpaRepository<MalasiyaReport, Long> {

	MalasiyaReport findByPatientId(Long long1);

	void deleteByPatientId(Long id);

}
