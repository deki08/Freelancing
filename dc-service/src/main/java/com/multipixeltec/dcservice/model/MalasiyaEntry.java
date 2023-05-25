package com.multipixeltec.dcservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "MALASIYA_ENTRY")
public class MalasiyaEntry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@Column
	String heartSize;
	@Column
	String heartSound;
	@Column
	String breathSound;
	@Column
	String otherRindings;
	@Column
	String liver;
	@Column
	String spleen;
	@Column
	String mentalStatus;
	@Column
	String mentalSpeech;
	@Column
	String mentalMotorPower;
	@Column
	String varicoseVeins;
	@Column
	String mentalRefleses;
	@Column
	String dateOfXrayTaken;
	@Column
	String dateOfXrayReported;
	@Column
	String urineOpiates;
	@Column
	String cannabinoids;
	@Column
	String urineHcg;
	@Column
	String statusOfHivOrAids;
	@Column
	String statusOfTB;
	@Column
	String statusOfMalaria;
	@Column
	String statusOfHepatitis;
	@Column
	String statusOfSTD;
	@Column
	String statusOfEpilepsy;
	@Column
	String statusOfCancer;
	@Column
	String statusOfDrugs;
	@Column
	String statusOfLeprosy;
	@Column
	String statusOfPregnancy;
	@Column
	String statusOfPsychiatricIll;
	@Column
	String statusOfOther;
	@Column
	String genitourinaryKidney;
	@Column
	String genitourinaryDischarge;
	@Column
	String genitourinarySoresOrUlcer;
	@Column
	String laboratoryReceivedDate;
	@Column
	String laboratoryReportDateOfLab;
	@Column
	String bloodGroup;
	@Column
	String femaleSpecificGravity;
	@Column
	String femaleUrineColor;
	@Column
	String femaleUrinePh;
	@Column
	String femaleUrineLeucocytes;
	@Column
	String femaleGlucose;
	@Column
	String femaleProtein;
	@Column
	String femaleBlood;
	@Column
	String femaleMicroscopy;
	@Column
	String femaleRedBloodCell;
	@Column
	String femaleWhiteBloodCell;
	@Column
	String femaleEpithelialCell;
	@Column
	String femaleCasts;
	@Column
	String femaleCrystal;
	@Column
	String femaleBacteria;
	@Column
	String femaleOthers;
	@Column
	String serologyHivAntibody;
	@Column
	String serologyHbsAG;
	@Column
	String serologyVdrl;
	@Column
	String serologyMalariaParasite;
	@Column
	String serologyFBS;
	@Column
	String reportOfHeartShape;
	@Column
	String reportOfHeartSize;
	@Column
	String reportOfLungFields;
	@Column
	String reportOfMediastinum;
	@Column
	String reportOfPleuralHemidiaphragms;
	@Column
	String reportOfCostoPhrenic;
	@Column
	String reportOfToracicCase;
	@Column
	String findingsOfFocalLesion;
	@Column
	String findingsOfAbnormalities;
	@Column
	String familyHistory;
	@Column
	String diabetes;
	@Column
	String bloodPressure;
	@Column
	String epilepsy;
	@Column
	String asthama;

}
