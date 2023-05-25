package com.multipixeltec.dcservice.service;

import java.util.List;
import java.util.Optional;

import com.multipixeltec.dcservice.model.MalasiyaEntry;
import com.multipixeltec.dcservice.model.MalasiyaReport;

public interface MalasiyaEntryService {

	List<MalasiyaEntry> findAll();

	MalasiyaEntry save(MalasiyaEntry refvalue);

	Optional<MalasiyaEntry> find(long l);

	MalasiyaReport findById(String id);

}
