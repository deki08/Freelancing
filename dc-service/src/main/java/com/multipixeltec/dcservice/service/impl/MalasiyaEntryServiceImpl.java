package com.multipixeltec.dcservice.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multipixeltec.dcservice.model.MalasiyaEntry;
import com.multipixeltec.dcservice.repository.MalasiyaEntryRespository;
import com.multipixeltec.dcservice.service.MalasiyaEntryService;

@Service
public class MalasiyaEntryServiceImpl implements MalasiyaEntryService {

	@Autowired
	private MalasiyaEntryRespository entryRespository;

	@Override
	public List<MalasiyaEntry> findAll() {
		// TODO Auto-generated method stub
		return entryRespository.findAll();
	}

	@Override
	public MalasiyaEntry save(MalasiyaEntry refvalue) {
		// TODO Auto-generated method stub
		return entryRespository.save(refvalue);
	}

	@Override
	public Optional<MalasiyaEntry> find(long l) {
		// TODO Auto-generated method stub
		return entryRespository.findById(l);
	}
}
