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
	public MalasiyaReport UpdateforPatient(MalasiyaReport malasiyaEntry) {
		// TODO Auto-generated method stub
		MalasiyaReport malasiyaReport = malasiyaReportRepository.findByPatientId(malasiyaEntry.getPatientId());
		if (malasiyaReport != null) {

			// Set values from MalasiyaEntry to MalasiyaReport
			malasiyaReport.setHeartSize(malasiyaEntry.getHeartSize());
			malasiyaReport.setHeartSound(malasiyaEntry.getHeartSound());
			malasiyaReport.setBreathSound(malasiyaEntry.getBreathSound());
			malasiyaReport.setOtherRindings(malasiyaEntry.getOtherRindings());
			malasiyaReport.setLiver(malasiyaEntry.getLiver());
			malasiyaReport.setSpleen(malasiyaEntry.getSpleen());
			malasiyaReport.setMentalStatus(malasiyaEntry.getMentalStatus());
			malasiyaReport.setMentalSpeech(malasiyaEntry.getMentalSpeech());
			malasiyaReport.setMentalMotorPower(malasiyaEntry.getMentalMotorPower());
			malasiyaReport.setVaricoseVeins(malasiyaEntry.getVaricoseVeins());
			malasiyaReport.setMentalRefleses(malasiyaEntry.getMentalRefleses());
			malasiyaReport.setDateOfXrayTaken(malasiyaEntry.getDateOfXrayTaken());
			malasiyaReport.setDateOfXrayReported(malasiyaEntry.getDateOfXrayReported());
			malasiyaReport.setUrineOpiates(malasiyaEntry.getUrineOpiates());
			malasiyaReport.setCannabinoids(malasiyaEntry.getCannabinoids());
			malasiyaReport.setUrineHcg(malasiyaEntry.getUrineHcg());

			// Set the remaining attributes similarly
			malasiyaReport.setStatusOfHivOrAids(malasiyaEntry.getStatusOfHivOrAids());
			malasiyaReport.setStatusOfTB(malasiyaEntry.getStatusOfTB());
			malasiyaReport.setStatusOfMalaria(malasiyaEntry.getStatusOfMalaria());
			malasiyaReport.setStatusOfHepatitis(malasiyaEntry.getStatusOfHepatitis());
			malasiyaReport.setStatusOfSTD(malasiyaEntry.getStatusOfSTD());
			malasiyaReport.setStatusOfEpilepsy(malasiyaEntry.getStatusOfEpilepsy());
			malasiyaReport.setStatusOfCancer(malasiyaEntry.getStatusOfCancer());
			malasiyaReport.setStatusOfDrugs(malasiyaEntry.getStatusOfDrugs());
			malasiyaReport.setStatusOfLeprosy(malasiyaEntry.getStatusOfLeprosy());
			malasiyaReport.setStatusOfPregnancy(malasiyaEntry.getStatusOfPregnancy());
			malasiyaReport.setStatusOfPsychiatricIll(malasiyaEntry.getStatusOfPsychiatricIll());
			malasiyaReport.setStatusOfOther(malasiyaEntry.getStatusOfOther());
			malasiyaReport.setGenitourinaryKidney(malasiyaEntry.getGenitourinaryKidney());
			malasiyaReport.setGenitourinaryDischarge(malasiyaEntry.getGenitourinaryDischarge());
			malasiyaReport.setGenitourinarySoresOrUlcer(malasiyaEntry.getGenitourinarySoresOrUlcer());
			malasiyaReport.setLaboratoryReceivedDate(malasiyaEntry.getLaboratoryReceivedDate());
			malasiyaReport.setLaboratoryReportDateOfLab(malasiyaEntry.getLaboratoryReportDateOfLab());
			malasiyaReport.setBloodGroup(malasiyaEntry.getBloodGroup());
			malasiyaReport.setFemaleSpecificGravity(malasiyaEntry.getFemaleSpecificGravity());
			malasiyaReport.setFemaleUrineColor(malasiyaEntry.getFemaleUrineColor());
			malasiyaReport.setFemaleUrinePh(malasiyaEntry.getFemaleUrinePh());
			malasiyaReport.setFemaleUrineLeucocytes(malasiyaEntry.getFemaleUrineLeucocytes());
			malasiyaReport.setFemaleGlucose(malasiyaEntry.getFemaleGlucose());
			malasiyaReport.setFemaleProtein(malasiyaEntry.getFemaleProtein());
			malasiyaReport.setFemaleBlood(malasiyaEntry.getFemaleBlood());
			malasiyaReport.setFemaleMicroscopy(malasiyaEntry.getFemaleMicroscopy());
			malasiyaReport.setFemaleRedBloodCell(malasiyaEntry.getFemaleRedBloodCell());
			malasiyaReport.setFemaleWhiteBloodCell(malasiyaEntry.getFemaleWhiteBloodCell());
			malasiyaReport.setFemaleEpithelialCell(malasiyaEntry.getFemaleEpithelialCell());
			malasiyaReport.setFemaleCasts(malasiyaEntry.getFemaleCasts());
			malasiyaReport.setFemaleCrystal(malasiyaEntry.getFemaleCrystal());
			malasiyaReport.setFemaleBacteria(malasiyaEntry.getFemaleBacteria());
			malasiyaReport.setFemaleOthers(malasiyaEntry.getFemaleOthers());
			malasiyaReport.setSerologyHivAntibody(malasiyaEntry.getSerologyHivAntibody());
			malasiyaReport.setSerologyHbsAG(malasiyaEntry.getSerologyHbsAG());
			malasiyaReport.setSerologyVdrl(malasiyaEntry.getSerologyVdrl());
			malasiyaReport.setSerologyMalariaParasite(malasiyaEntry.getSerologyMalariaParasite());
			malasiyaReport.setSerologyFBS(malasiyaEntry.getSerologyFBS());
			malasiyaReport.setReportOfHeartShape(malasiyaEntry.getReportOfHeartShape());
			malasiyaReport.setReportOfHeartSize(malasiyaEntry.getReportOfHeartSize());
			malasiyaReport.setReportOfLungFields(malasiyaEntry.getReportOfLungFields());
			malasiyaReport.setReportOfMediastinum(malasiyaEntry.getReportOfMediastinum());
			malasiyaReport.setReportOfPleuralHemidiaphragms(malasiyaEntry.getReportOfPleuralHemidiaphragms());
			malasiyaReport.setReportOfCostoPhrenic(malasiyaEntry.getReportOfCostoPhrenic());
			malasiyaReport.setReportOfToracicCase(malasiyaEntry.getReportOfToracicCase());
			malasiyaReport.setFindingsOfFocalLesion(malasiyaEntry.getFindingsOfFocalLesion());
			malasiyaReport.setFindingsOfAbnormalities(malasiyaEntry.getFindingsOfAbnormalities());
			malasiyaReport.setFamilyHistory(malasiyaEntry.getFamilyHistory());
			malasiyaReport.setDiabetes(malasiyaEntry.getDiabetes());
			malasiyaReport.setBloodPressure(malasiyaEntry.getBloodPressure());
			malasiyaReport.setEpilepsy(malasiyaEntry.getEpilepsy());
			malasiyaReport.setAsthama(malasiyaEntry.getAsthama());
			malasiyaReport.setNameOfDoctor(malasiyaEntry.getNameOfDoctor());
			malasiyaReport.setDate(malasiyaEntry.getDate());
			malasiyaReport.setHospitaladdress(malasiyaEntry.getHospitaladdress());
			malasiyaReport.setQualification(malasiyaEntry.getQualification());
			malasiyaReport.setModifiedDate(malasiyaEntry.getModifiedDate());
			malasiyaReport.setHiv(malasiyaEntry.getHiv());
			malasiyaReport.setHypertension(malasiyaEntry.getHypertension());
			malasiyaReport.setTuberclosis(malasiyaEntry.getTuberclosis());
			malasiyaReport.setHeartDisease(malasiyaEntry.getHeartDisease());
			malasiyaReport.setLeporsy(malasiyaEntry.getLeporsy());
			malasiyaReport.setBronchialAsthama(malasiyaEntry.getBronchialAsthama());
			malasiyaReport.setViralHeptites(malasiyaEntry.getViralHeptites());
			malasiyaReport.setDiabetesMellitus(malasiyaEntry.getDiabetesMellitus());
			malasiyaReport.setPsychitricIllness(malasiyaEntry.getPsychitricIllness());
			malasiyaReport.setPepticUlcer(malasiyaEntry.getPepticUlcer());
			malasiyaReport.setKidneyDeasese(malasiyaEntry.getKidneyDeasese());
			malasiyaReport.setCancer(malasiyaEntry.getCancer());
			malasiyaReport.setOthers(malasiyaEntry.getOthers());
			malasiyaReport.setSexTransDisease(malasiyaEntry.getSexTransDisease());
			malasiyaReport.setMalaria(malasiyaEntry.getMalaria());
			malasiyaReport.setHeight(malasiyaEntry.getHeight());
			malasiyaReport.setDeformities(malasiyaEntry.getDeformities());
			malasiyaReport.setWeight(malasiyaEntry.getWeight());
			malasiyaReport.setAnemia(malasiyaEntry.getAnemia());
			malasiyaReport.setPulse(malasiyaEntry.getPulse());
			malasiyaReport.setJaudice(malasiyaEntry.getJaudice());
			malasiyaReport.setBp(malasiyaEntry.getBp());
			malasiyaReport.setLne(malasiyaEntry.getLne());
			malasiyaReport.setBd(malasiyaEntry.getBd());
			malasiyaReport.setVAUnaided(malasiyaEntry.getVAUnaided());
			malasiyaReport.setLmp(malasiyaEntry.getLmp());
			malasiyaReport.setBAided(malasiyaEntry.getBAided());
			malasiyaReport.setChronicSkinRash(malasiyaEntry.getChronicSkinRash());
			malasiyaReport.setHearing(malasiyaEntry.getHearing());
			malasiyaReport.setAnSkinPatch(malasiyaEntry.getAnSkinPatch());
			malasiyaReport.setOtherIfabNormalCOndition(malasiyaEntry.getOtherIfabNormalCOndition());

			// Now the malasiyaReport object contains all the values from malasiyaEntry

			malasiyaReportRepository.save(malasiyaReport);
		}
		return malasiyaReport;
	}
}
