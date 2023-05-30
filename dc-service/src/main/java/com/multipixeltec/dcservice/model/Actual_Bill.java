package com.multipixeltec.dcservice.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="ACTUAL_BILL")
@Data
public class Actual_Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	private String patientId;
	@Column
	private String name;
	@Column
	private Date date;
	@Column
	private String agency;
	@Column
	private String travellingTo;
	@Column
	private String packageName;
	@Column
	private Double recieved;
	@Column
	private Double netAmount;
	@Column
	private Double commision;
	@Column
	private Double due;
	@Column
	private Double paid;
	@Column
	private String remarks;	

}
