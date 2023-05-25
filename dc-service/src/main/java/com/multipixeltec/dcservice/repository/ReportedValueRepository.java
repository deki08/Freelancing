package com.multipixeltec.dcservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multipixeltec.dcservice.model.ReportedValue;

public interface ReportedValueRepository extends JpaRepository<ReportedValue, Long>{

}
