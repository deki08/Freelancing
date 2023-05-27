package com.multipixeltec.dcservice.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class updateStatusDto {
	
	private Long patientId;
	private String status;
	
}
