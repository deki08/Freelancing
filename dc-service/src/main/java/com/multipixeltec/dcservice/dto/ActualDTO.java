package com.multipixeltec.dcservice.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ActualDTO {
	
	
    private Integer pageNumber;
    private Integer pageSize;
    private String column;
    private String sort;
    private String text;
    private String text2;
    private String from;
    private String to;
    private Long total;
    private List data;
    
    public ActualDTO(String from,String to)
    {
    	   this.from = from;
           this.to = to;
    }
}
