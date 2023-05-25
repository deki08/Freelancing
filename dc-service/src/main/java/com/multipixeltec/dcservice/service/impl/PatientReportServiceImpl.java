package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.MalasiyaEntry;
import com.multipixeltec.dcservice.model.MalasiyaReport;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.PatientReport;
import com.multipixeltec.dcservice.repository.MalasiyaEntryRespository;
import com.multipixeltec.dcservice.repository.MalasiyaReportRepository;
import com.multipixeltec.dcservice.repository.PatientReportRepository;
import com.multipixeltec.dcservice.service.PatientReportService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class PatientReportServiceImpl implements PatientReportService {

	@Autowired
	private PatientReportRepository patientreportRepository;

	@Autowired
	private MalasiyaReportRepository malasiyaReportRepository;

	@Autowired
	private MalasiyaEntryRespository entryRespository;

	@Override
	public PatientReport save(PatientReport patientreport) {
		return patientreportRepository.save(patientreport);
	}

	@Override
	public Optional<PatientReport> find(Long id) {
		return patientreportRepository.findById(id);
	}

	@Override
	public List<PatientReport> findAll() {
		return patientreportRepository.findAll();
	}

	@Override
	public List<PatientReport> findAll(Sort sort) {
		return patientreportRepository.findAll(sort);
	}

	@Override
	public Page<PatientReport> findAll(Pageable pageable) {
		return patientreportRepository.findAll(pageable);
	}

	@Override
	public void delete(Long id) {
		patientreportRepository.deleteById(id);
	}

	@Override
	public void delete(PatientReport patientreport) {
		patientreportRepository.delete(patientreport);
	}

	@Override
	public void deleteAll() {
		patientreportRepository.deleteAll();
	}

	@Override
	public long count() {
		return patientreportRepository.count();
	}

	@Override
	public Long countBetweenDate(PageDetails page) {
		return patientreportRepository.countBetweenDate(page);
	}

	@Override
	public Long completedCountBetweenDate(PageDetails page) {
		return patientreportRepository.completedCountBetweenDate(page);
	}

	@Override
	public Long pendingCountBetweenDate(PageDetails page) {
		return patientreportRepository.pendingCountBetweenDate(page);
	}

	@Override
	public void saveMalasiyaReport(Patient patient) {
		Optional<MalasiyaEntry> entry1 = entryRespository.findById(1L);
		if (entry1.isPresent()) {
			MalasiyaEntry entry = entry1.get();
			MalasiyaReport report = new MalasiyaReport();
			report.setPatientId(patient.getId());
			report.setHeartSize(entry.getHeartSize());
			report.setHeartSound(entry.getHeartSound());
			report.setBreathSound(entry.getBreathSound());
			report.setOtherRindings(entry.getOtherRindings());
			report.setLiver(entry.getLiver());
			report.setSpleen(entry.getSpleen());
			report.setMentalStatus(entry.getMentalStatus());
			report.setMentalSpeech(entry.getMentalSpeech());
			report.setMentalMotorPower(entry.getMentalMotorPower());
			report.setVaricoseVeins(entry.getVaricoseVeins());
			report.setMentalRefleses(entry.getMentalRefleses());
			report.setDateOfXrayTaken(entry.getDateOfXrayTaken());
			report.setDateOfXrayReported(entry.getDateOfXrayReported());
			report.setUrineOpiates(entry.getUrineOpiates());
			report.setCannabinoids(entry.getCannabinoids());
			report.setUrineHcg(entry.getUrineHcg());
			report.setStatusOfHivOrAids(entry.getStatusOfHivOrAids());
			report.setStatusOfTB(entry.getStatusOfTB());
			report.setStatusOfMalaria(entry.getStatusOfMalaria());
			report.setStatusOfHepatitis(entry.getStatusOfHepatitis());
			report.setStatusOfSTD(entry.getStatusOfSTD());
			report.setStatusOfEpilepsy(entry.getStatusOfEpilepsy());
			report.setStatusOfCancer(entry.getStatusOfCancer());
			report.setStatusOfDrugs(entry.getStatusOfDrugs());
			report.setStatusOfLeprosy(entry.getStatusOfLeprosy());
			report.setStatusOfPregnancy(entry.getStatusOfPregnancy());
			report.setStatusOfPsychiatricIll(entry.getStatusOfPsychiatricIll());
			report.setStatusOfOther(entry.getStatusOfOther());
			report.setGenitourinaryKidney(entry.getGenitourinaryKidney());
			report.setGenitourinaryDischarge(entry.getGenitourinaryDischarge());
			report.setGenitourinarySoresOrUlcer(entry.getGenitourinarySoresOrUlcer());
			report.setLaboratoryReceivedDate(entry.getLaboratoryReceivedDate());
			report.setLaboratoryReportDateOfLab(entry.getLaboratoryReportDateOfLab());
			report.setBloodGroup(entry.getBloodGroup());
			report.setFemaleSpecificGravity(entry.getFemaleSpecificGravity());
			report.setFemaleUrineColor(entry.getFemaleUrineColor());
			report.setFemaleUrinePh(entry.getFemaleUrinePh());
			report.setFemaleUrineLeucocytes(entry.getFemaleUrineLeucocytes());
			report.setFemaleGlucose(entry.getFemaleGlucose());
			report.setFemaleProtein(entry.getFemaleProtein());
			report.setFemaleBlood(entry.getFemaleBlood());
			report.setFemaleMicroscopy(entry.getFemaleMicroscopy());
			report.setFemaleRedBloodCell(entry.getFemaleRedBloodCell());
			report.setFemaleWhiteBloodCell(entry.getFemaleWhiteBloodCell());
			report.setFemaleEpithelialCell(entry.getFemaleEpithelialCell());
			report.setFemaleCasts(entry.getFemaleCasts());
			report.setFemaleCrystal(entry.getFemaleCrystal());
			report.setFemaleBacteria(entry.getFemaleBacteria());
			report.setFemaleOthers(entry.getFemaleOthers());
			report.setSerologyHivAntibody(entry.getSerologyHivAntibody());
			report.setSerologyHbsAG(entry.getSerologyHbsAG());
			report.setSerologyVdrl(entry.getSerologyVdrl());
			report.setSerologyMalariaParasite(entry.getSerologyMalariaParasite());
			report.setSerologyFBS(entry.getSerologyFBS());
			report.setReportOfHeartShape(entry.getReportOfHeartShape());
			report.setReportOfHeartSize(entry.getReportOfHeartSize());
			report.setReportOfLungFields(entry.getReportOfLungFields());
			report.setReportOfMediastinum(entry.getReportOfMediastinum());
			report.setReportOfPleuralHemidiaphragms(entry.getReportOfPleuralHemidiaphragms());
			report.setReportOfCostoPhrenic(entry.getReportOfCostoPhrenic());
			report.setReportOfToracicCase(entry.getReportOfToracicCase());
			report.setFindingsOfFocalLesion(entry.getFindingsOfFocalLesion());
			report.setFindingsOfAbnormalities(entry.getFindingsOfAbnormalities());
			report.setFamilyHistory(entry.getFamilyHistory());
			report.setDiabetes(entry.getDiabetes());
			report.setBloodPressure(entry.getBloodPressure());
			report.setEpilepsy(entry.getEpilepsy());
			report.setAsthama(entry.getAsthama());
			report.setNameOfDoctor(entry.getNameOfDoctor());
			malasiyaReportRepository.save(report);

		}

	}

}
