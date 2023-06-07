package com.multipixeltec.dcservice.model;

import java.util.Date;

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
	@Column(length=15)
	String heartSize;
	@Column(length=15)
	String heartSound;
	@Column(length=15)
	String breathSound;
	@Column(length=15)
	String otherRindings;
	@Column(length=15)
	String liver;
	@Column(length=15)
	String spleen;
	@Column(length=15)
	String mentalStatus;
	@Column(length=15)
	String mentalSpeech;
	@Column(length=15)
	String mentalMotorPower;
	@Column(length=15)
	String varicoseVeins;
	@Column(length=15)
	String mentalRefleses;
	@Column(length=15)
	String dateOfXrayTaken;
	@Column(length=15)
	String dateOfXrayReported;
	@Column(length=15)
	String urineOpiates;
	@Column(length=15)
	String cannabinoids;
	@Column(length=15)
	String urineHcg;
	@Column(length=15)
	String statusOfHivOrAids;
	@Column(length=15)
	String statusOfTB;
	@Column(length=15)
	String statusOfMalaria;
	@Column(length=15)
	String statusOfHepatitis;
	@Column(length=15)
	String statusOfSTD;
	@Column(length=15)
	String statusOfEpilepsy;
	@Column(length=15)
	String statusOfCancer;
	@Column(length=15)
	String statusOfDrugs;
	@Column(length=15)
	String statusOfLeprosy;
	@Column(length=15)
	String statusOfPregnancy;
	@Column(length=15)
	String statusOfPsychiatricIll;
	@Column(length=15)
	String statusOfOther;
	@Column(length=15)
	String genitourinaryKidney;
	@Column(length=15)
	String genitourinaryDischarge;
	@Column(length=15)
	String genitourinarySoresOrUlcer;
	@Column(length=15)
	String laboratoryReceivedDate;
	@Column(length=15)
	String laboratoryReportDateOfLab;
	@Column(length=15)
	String bloodGroup;
	@Column(length=15)
	String femaleSpecificGravity;
	@Column(length=15)
	String femaleUrineColor;
	@Column(length=15)
	String femaleUrinePh;
	@Column(length=15)
	String femaleUrineLeucocytes;
	@Column(length=15)
	String femaleGlucose;
	@Column(length=15)
	String femaleProtein;
	@Column(length=15)
	String femaleBlood;
	@Column(length=15)
	String femaleMicroscopy;
	@Column(length=15)
	String femaleRedBloodCell;
	@Column(length=15)
	String femaleWhiteBloodCell;
	@Column(length=15)
	String femaleEpithelialCell;
	@Column(length=15)
	String femaleCasts;
	@Column(length=15)
	String femaleCrystal;
	@Column(length=15)
	String femaleBacteria;
	@Column(length=15)
	String femaleOthers;
	@Column(length=15)
	String serologyHivAntibody;
	@Column(length=15)
	String serologyHbsAG;
	@Column(length=15)
	String serologyVdrl;
	@Column(length=15)
	String serologyMalariaParasite;
	@Column(length=15)
	String serologyFBS;
	@Column(length=15)
	String reportOfHeartShape;
	@Column(length=15)
	String reportOfHeartSize;
	@Column(length=15)
	String reportOfLungFields;
	@Column(length=15)
	String reportOfMediastinum;
	@Column(length=15)
	String reportOfPleuralHemidiaphragms;
	@Column(length=15)
	String reportOfCostoPhrenic;
	@Column(length=15)
	String reportOfToracicCase;
	@Column(length=15)
	String findingsOfFocalLesion;
	@Column(length=15)
	String findingsOfAbnormalities;
	@Column(length=15)
	String familyHistory;
	@Column(length=15)
	String diabetes;
	@Column(length=15)
	String bloodPressure;
	@Column(length=15)
	String epilepsy;
	@Column(length=15)
	String asthama;
	@Column(length=15)
	String nameOfDoctor;
	@Column(length=15)
	Date date;
	@Column(length=15)
	String hospitaladdress;
	@Column(length=15)
	String qualification;
	@Column(length=15)
	Date modifiedDate;

	@Column(length=15)
	String hiv;
	@Column(length=15)
	String hypertension;
	@Column(length=15)
	String tuberclosis;
	@Column(length=15)
	String heartDisease;
	@Column(length=15)
	String leporsy;
	@Column(length=15)
	String bronchialAsthama;
	@Column(length=15)
	String viralHeptites;
	@Column(length=15)
	String diabetesMellitus;
	@Column(length=15)
	String psychitricIllness;
	@Column(length=15)
	String pepticUlcer;
	@Column(length=15)
	String kidneyDeasese;
	@Column(length=15)
	String cancer;
	@Column(length=15)
	String others;
	@Column(length=15)
	String sexTransDisease;
	@Column(length=15)
	String malaria;
	@Column(length=15)
	String height;
	@Column(length=15)
	String deformities;
	@Column(length=15)
	String weight;
	@Column(length=15)
	String anemia;
	@Column(length=15)
	String pulse;
	@Column(length=15)
	String jaudice;
	@Column(length=15)
	String bp;
	@Column(length=15)
	String lne;
	@Column(length=15)
	String bd;
	@Column(length=15)
	String vAUnaided;
	@Column(length=15)
	Date lmp;
	@Column(length=15)
	String bAided;
	@Column(length=15)
	String chronicSkinRash;
	@Column(length=15)
	String hearing;
	@Column(length=15)
	String anSkinPatch;
	@Column(length=15)
	String otherIfabNormalCOndition;
}
