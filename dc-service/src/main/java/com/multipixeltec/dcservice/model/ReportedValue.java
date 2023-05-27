package com.multipixeltec.dcservice.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "RPORTED_VALUE")
@Data
@ToString
public class ReportedValue {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String earLeft;
	@Column
	private String earRight;
	@Column
	private String bloodPressure;
	@Column
	private String heart;
	@Column
	private String lungs;
	@Column
	private String gastrointestinalAbdomen;
	@Column
	private String height;
	@Column
	private String weight;
	@Column
	private String hernia;
	@Column
	private String varicoseVeins;
	@Column
	private String deformities;
	@Column
	private String skin;
	@Column
	private String cns;
	@Column
	private String extremities;
	@Column
	private String psychiatry;
	@Column
	private String symptoms;
	@Column
	private String chestXray;
	@Column
	private String ecg;
	@Column
	private String hiv;
	@Column
	private String hbsag;
	@Column
	private String thc;
	@Column
	private String mop;
	@Column
	private String amp;
	@Column
	private String sugar;
	@Column
	private String albumin;
	@Column
	private String urineBilharziasis;
	@Column
	private String pregnancy;
	@Column
	private String others;
	@Column
	private String helminths;
	@Column
	private String giardia;
	@Column
	private String bilharziasis;
	@Column
	private String culture;
	@Column
	private String stoolBilharziasis;
	@Column
	private String malaria;
	@Column
	private String microfilaria;
	@Column
	private String bloodGroup;
	@Column
	private String haemoglobin;
	@Column
	private String esr;
	@Column
	private String rbs;
	@Column
	private String creatinine;
	@Column
	private String tbil;
	@Column
	private String sgot;
	@Column
	private String sgpt;
	@Column
	private String alp;
	@Column
	private String urea;
	@Column
	private String antiHcv;
	@Column
	private String tpha;
	@Column
	private String vdrl;
	@Column
	private String status;
	@Column
	private String remark;
	@Column
	private Date expireDate;
	@Column
	private String pulse;
	@Column
	private String distantAidedRight;
	@Column
	private String distantAidedLeft;
	@Column
	private String distantUnaidedRight;
	@Column
	private String distantUnaidedLeft;
	@Column
	private String nearAidedRight;
	@Column
	private String nearAidedLeft;
	@Column
	private String nearUnaidedRight;
	@Column
	private String nearUnaidedLeft;
	@Column
	private String clearVision;

}
