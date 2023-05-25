package com.multipixeltec.dcservice.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multipixeltec.dcservice.model.MalasiyaEntry;
import com.multipixeltec.dcservice.model.MalasiyaReport;
import com.multipixeltec.dcservice.repository.MalasiyaEntryRespository;
import com.multipixeltec.dcservice.repository.MalasiyaReportRepository;
import com.multipixeltec.dcservice.service.MalasiyaEntryService;

@Service
public class MalasiyaEntryServiceImpl implements MalasiyaEntryService {

	@Autowired
	private MalasiyaEntryRespository entryRespository;

	@Autowired
	private MalasiyaReportRepository malasiyaReportRepository;

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

	@Override
	public MalasiyaReport findById(String id) {
		// TODO Auto-generated method stub
		return malasiyaReportRepository.findByPatientId(Long.valueOf(id));
	}

	@Override
	public MalasiyaReport UpdateforPatient(MalasiyaReport entry) {
		// TODO Auto-generated method stub
		MalasiyaReport report = malasiyaReportRepository.findByPatientId(entry.getPatientId());
		if (report != null) {	
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
		return report;
	}
}
