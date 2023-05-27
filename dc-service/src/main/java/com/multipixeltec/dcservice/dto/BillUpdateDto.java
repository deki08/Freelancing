package com.multipixeltec.dcservice.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class BillUpdateDto  implements Serializable {
	
	private long patientId;
	private String valueType;
	private String updateMoney;

}
