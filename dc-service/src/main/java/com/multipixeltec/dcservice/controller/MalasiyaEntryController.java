package com.multipixeltec.dcservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multipixeltec.dcservice.model.MalasiyaEntry;
import com.multipixeltec.dcservice.service.MalasiyaEntryService;

@RestController
@RequestMapping("api/v1")
public class MalasiyaEntryController {

	@Autowired
	private MalasiyaEntryService entryService;

	@PostMapping("/mal-value")
	public MalasiyaEntry save(@RequestBody MalasiyaEntry refvalue) {
		List<MalasiyaEntry> values = entryService.findAll();
		if (values != null && values.size() != 0) {
			refvalue.setId(values.get(0).getId());
		}
		return entryService.save(refvalue);
	}

	@GetMapping("/mal-value")
	public MalasiyaEntry getAll() {
		List<MalasiyaEntry> values = entryService.findAll();
		return values.get(0);
	}
}
