package com.multipixeltec.dcservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.PaymentStatus;

import lombok.Getter;
import lombok.Setter;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-18
 * Developer : priyamal
 */

@Entity
@Getter @Setter
@Table(name = "BILL_PAYMENT")
public class BillPayment extends Auditable<User>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "BILL_ID",insertable=false, updatable = false)
    private Long billId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="BILL_ID",nullable = false)
    private Bill bill;

    @Column(name = "AMOUNT")
    private Double amount;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private PaymentStatus status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ACCOUNT_ID",nullable = false)
    private Account account;

    @Column(name = "ACCOUNT_ID", insertable = false, updatable = false)
    private Long accountId;

    @Column(name="Updated_BY")
    private String updateBy;
    
    
    public String getBillNo() {
        return getBill().getBillNo();
    }

    public String getPassportNo() {
        return getBill().getPassportNo();
    }

    public String getPatientName() {
        return getBill().getPatientName();
    }
    public String getCreatedByName() {
        return getBill().getPaidByName();
    }

    public String getAccountName() {
        if (account==null)
            return "N/A";
        return account.getName();
    }
    public String getAgencyName() {
        return getBill().getAgentOrAgencyName();
    }
    public String getRegNo() {
        return getBill().getRegNo();
    }
}
