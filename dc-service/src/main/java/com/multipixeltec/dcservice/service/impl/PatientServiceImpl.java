package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.dto.updateStatusDto;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.model.BillPayment;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.PatientReport;
import com.multipixeltec.dcservice.repository.Actual_BillRepository;
import com.multipixeltec.dcservice.repository.BillPaymentRepository;
import com.multipixeltec.dcservice.repository.BillRepository;
import com.multipixeltec.dcservice.repository.MalasiyaReportRepository;
import com.multipixeltec.dcservice.repository.PatientReportRepository;
import com.multipixeltec.dcservice.repository.PatientRepository;
import com.multipixeltec.dcservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private BillRepository billRepository;

	@Autowired
	private MalasiyaReportRepository malasiyaReportRepository;

	@Override
	public Patient save(Patient patient) {
		return patientRepository.save(patient);
	}

	@Override
	public Optional<Patient> find(Long id) {
		return patientRepository.findById(id);
	}

	@Override
	public List<Patient> findAll() {
		return patientRepository.findAll();
	}

	@Override
	public List<Patient> findAll(Sort sort) {
		return patientRepository.findAll(sort);
	}

	@Override
	public Page<Patient> findAll(Pageable pageable) {
		return patientRepository.findAll(pageable);
	}

	@Autowired
	private PatientReportRepository patientReportRepository;
	@Autowired
	private Actual_BillRepository actual_BillRepository;

	@Transactional
	@Override
	public void delete(Long id) {
		Optional<Patient> patient = patientRepository.findById(id);
		if (patient.isPresent()) {
			Patient patientToDelete = patient.get();
			if (patient != null) {
				PatientReport report = patientToDelete.getReport();

				if (report != null) {
					actual_BillRepository.deleteByPatientId(patientToDelete.getRegNo());
					patientToDelete.setReport(null);
					patientReportRepository.delete(report);
					System.out.println("deleted");
				}
				patientRepository.delete(patientToDelete);

			}

		}

	}

	@Override
	public void delete(Patient patient) {
		patientRepository.delete(patient);
	}

	@Override
	public void deleteAll() {
		patientRepository.deleteAll();
	}

	@Override
	public long count() {
		return patientRepository.count();
	}

	@Override
	public List<Patient> saveAll(List<Patient> patientList) {
		return patientRepository.saveAll(patientList);
	}

	@Override
	public Page<Patient> findAll(String query, Pageable page) {
		return patientRepository.findAll(query, page);
	}

	@Override
	public Page<Patient> findAllByDate(PageDetails page, Pageable pageable) {
		return patientRepository.findAllByDate(page, pageable);
	}

	@Override
	public Page<Patient> findAllByDateAndText(PageDetails page, Pageable pageable) {
		return patientRepository.findAllByDateAndText(page, pageable);
	}

	@Override
	public List<Patient> searchByText(String text, Pageable pageable) {
		return patientRepository.searchByText(text, pageable);
	}

	@Override
	public List<Patient> findByPassport(String passport) {
		return patientRepository.findByPassport(passport);
	}

	@Override
	public long countByMonth(String date) {
		return patientRepository.countByMonth(date);
	}

	@Override
	public List<Patient> findAllByMonth(String date) {
		return patientRepository.findAllByMonth(date);
	}

	@Override
	public String updateStatus(updateStatusDto id) {
		// TODO Auto-generated method stub
		Optional<Patient> patient = patientRepository.findById(id.getPatientId());
		if (patient.isPresent()) {
			Patient patient2 = patient.get();
			patient2.setCurrentStatus(id.getStatus());
			patientRepository.save(patient2);
		}
		return "Success";
	}

}
