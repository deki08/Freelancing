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
	@Column(length=15)
	private String earLeft;
	@Column(length=15)
	private String earRight;
	@Column(length=15)
	private String bloodPressure;
	@Column(length=15)
	private String heart;
	@Column(length=15)
	private String lungs;
	@Column(length=15)
	private String gastrointestinalAbdomen;
	@Column(length=15)
	private String height;
	@Column(length=15)
	private String weight;
	@Column(length=15)
	private String hernia;
	@Column(length=15)
	private String varicoseVeins;
	@Column(length=15)
	private String deformities;
	@Column(length=15)
	private String skin;
	@Column(length=15)
	private String cns;
	@Column(length=15)
	private String extremities;
	@Column(length=15)
	private String psychiatry;
	@Column(length=15)
	private String symptoms;
	@Column(length=15)
	private String chestXray;
	@Column(length=15)
	private String ecg;
	@Column(length=15)
	private String hiv;
	@Column(length=15)
	private String hbsag;
	@Column(length=15)
	private String thc;
	@Column(length=15)
	private String mop;
	@Column(length=15)
	private String amp;
	@Column(length=15)
	private String sugar;
	@Column(length=15)
	private String albumin;
	@Column(length=15)
	private String urineBilharziasis;
	@Column(length=15)
	private String pregnancy;
	@Column(length=15)
	private String others;
	@Column(length=15)
	private String helminths;
	@Column(length=15)
	private String giardia;
	@Column(length=15)
	private String bilharziasis;
	@Column(length=15)
	private String culture;
	@Column(length=15)
	private String stoolBilharziasis;
	@Column(length=15)
	private String malaria;
	@Column(length=15)
	private String microfilaria;
	@Column(length=15)
	private String bloodGroup;
	@Column(length=15)
	private String haemoglobin;
	@Column(length=15)
	private String esr;
	@Column(length=15)
	private String rbs;
	@Column(length=15)
	private String creatinine;
	@Column(length=15)
	private String tbil;
	@Column(length=15)
	private String sgot;
	@Column(length=15)
	private String sgpt;
	@Column(length=15)
	private String alp;
	@Column(length=15)
	private String urea;
	@Column(length=15)
	private String antiHcv;
	@Column(length=15)
	private String tpha;
	@Column(length=15)
	private String vdrl;
	@Column(length=15)
	private String status;
	@Column(length=15)
	private String remark;
	@Column(length=15)
	private Date expireDate;
	@Column(length=15)
	private String pulse;
	@Column(length=15)
	private String distantAidedRight;
	@Column(length=15)
	private String distantAidedLeft;
	@Column(length=15)
	private String distantUnaidedRight;
	@Column(length=15)
	private String distantUnaidedLeft;
	@Column(length=15)
	private String nearAidedRight;
	@Column(length=15)
	private String nearAidedLeft;
	@Column(length=15)
	private String nearUnaidedRight;
	@Column(length=15)
	private String nearUnaidedLeft;
	@Column(length=15)
	private String clearVision;

}
