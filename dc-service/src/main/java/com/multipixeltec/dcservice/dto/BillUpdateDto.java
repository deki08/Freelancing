package com.multipixeltec.dcservice.dto;

import java.io.Serializable;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BillUpdateDto  implements Serializable {
	
	private long patientId;
	private String valueType;
	private String updateMoney;

}
