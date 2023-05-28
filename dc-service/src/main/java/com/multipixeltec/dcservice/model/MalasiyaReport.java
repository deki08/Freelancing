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
@Table(name = "malasiya_report")
public class MalasiyaReport {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@Column
	Long patientId;
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
	@Column
	String nameOfDoctor;
	@Column
	Date date;
	@Column
	String hospitaladdress;
	@Column
	String qualification;
	@Column
	Date modifiedDate;

	@Column
	String hiv;
	@Column
	String hypertension;
	@Column
	String tuberclosis;
	@Column
	String heartDisease;
	@Column
	String leporsy;
	@Column
	String bronchialAsthama;
	@Column
	String viralHeptites;
	@Column
	String diabetesMellitus;
	@Column
	String psychitricIllness;
	@Column
	String pepticUlcer;
	@Column
	String kidneyDeasese;
	@Column
	String cancer;
	@Column
	String others;
	@Column
	String sexTransDisease;
	@Column
	String malaria;
	@Column
	String height;
	@Column
	String deformities;
	@Column
	String weight;
	@Column
	String anemia;
	@Column
	String pulse;
	@Column
	String jaudice;
	@Column
	String bp;
	@Column
	String lne;
	@Column
	String bd;
	@Column
	String vAUnaided;
	@Column
	Date lmp;
	@Column
	String bAided;
	@Column
	String chronicSkinRash;
	@Column
	String hearing;
	@Column
	String anSkinPatch;
	@Column
	String otherIfabNormalCOndition;
	

}
