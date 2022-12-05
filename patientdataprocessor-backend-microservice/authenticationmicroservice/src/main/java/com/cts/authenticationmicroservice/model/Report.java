package com.cts.authenticationmicroservice.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
//	@ManyToOne(cascade = {
//			CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH
//	})
//	@JoinColumn(name = "contact_number")
	private Long contactNumber;
	
	private Date date;
	
	@Column(name="systolic")
	private int systolic;
	
	@Column(name="diastolic")
	private int diastolic;
	
	@Column(name="sugar_level")
	private int sugarlevel;
	
	@Column(name="sugar_level_2")
	private int sugarlevel2;
	
}
