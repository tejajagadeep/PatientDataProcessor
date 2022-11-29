package com.cts.patientdataprocessorbackend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private Date day;
	
	@Column(name="bp_lvl1")
	private int bpLevel1;
	
	@Column(name="bp_lvl2")
	private int bpLevel2;
	
	@Column(name="sugar_lvl")
	private int sugarLevel;
	
}