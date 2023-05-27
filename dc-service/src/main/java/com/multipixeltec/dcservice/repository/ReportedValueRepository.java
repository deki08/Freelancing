package com.multipixeltec.dcservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multipixeltec.dcservice.model.ReportedValue;

public interface ReportedValueRepository extends JpaRepository<ReportedValue, Long>{

	Optional<ReportedValue> findById(Long i);

}
