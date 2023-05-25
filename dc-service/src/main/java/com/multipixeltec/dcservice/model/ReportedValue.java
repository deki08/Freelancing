package com.multipixeltec.dcservice.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;



@Entity
@Table(name="RPORTED_VALUE")
@Data
public class ReportedValue {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id ;
	@Column
	String patientId ;
	@Column
	String eyeVisualAcuityLeft ;
	@Column
	String eyeVisualAcuityRight ;
	@Column
	String earLeft ;
	@Column
	String earRight ;
	@Column
	String bloodPressure ;
	@Column
	String heart ;
	@Column
	String lungs ;
	@Column
	String gastrointestinalAbdomen ;
	@Column
	String height ;
	@Column
	String weight ;
	@Column
	String hernia ;
	@Column
	String varicoseVeins ;
	@Column
	String deformities ;
	@Column
	String skin ;
	@Column
	String cns ;
	@Column
	String extremities ;
	@Column
	String psychiatry ;
	@Column
	String symptoms ;
	@Column
	String chestXray ;
	@Column
	String ecg ;
	@Column
	String hiv ;
	@Column
	String hbsag ;
	@Column
	String thc ;
	@Column
	String mop ;
	@Column
	String amp ;
	@Column
	String sugar ;
	@Column
	String albumin ;
	@Column
	String urineBilharziasis ;
	@Column
	String pregnancy ;
	@Column
	String others ;
	@Column
	String helminths ;
	@Column
	String giardia ;
	@Column
	String bilharziasis ;
	@Column
	String culture ;
	@Column
	String stoolBilharziasis ;
	@Column
	String malaria ;
	@Column
	String microfilaria ;
	@Column
	String bloodGroup ;
	@Column
	String haemoglobin ;
	@Column
	String esr ;
	@Column
	String rbs ;
	@Column
	String creatinine ;
	@Column
	String tbil ;
	@Column
	String sgot ;
	@Column
	String sgpt ;
	@Column
	String alp ;
	@Column
	String urea ;
	@Column
	String antiHcv ;
	@Column
	String tpha ;
	@Column
	String vdrl ;
	@Column
	String status ;
	@Column
	String remark ;
	@Column
	Date expireDate ;
	@Column
	String pulse ;
	@Column
	String distantAidedRight ;
	@Column
	String distantAidedLeft ;
	@Column
	String distantUnaidedRight ;
	@Column
	String distantUnaidedLeft ;
	@Column
	String nearAidedRight ;
	@Column
	String nearAidedLeft ;
	@Column
	String nearUnaidedRight ;
	@Column
	String nearUnaidedLeft ;
	@Column
	String clearVision ;

}
