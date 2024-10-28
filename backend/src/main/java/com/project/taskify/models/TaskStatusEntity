package com.project.taskify.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TaskStatusEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int statusId;
	
	@Column(nullable = false)
	private String status;
	
	@Column(nullable = false)
	private Date last_updated;
	
	public TaskStatusEntity() {}
	public TaskStatusEntity(String status, Date last_updated) {
		this.status = status;
		this.last_updated = last_updated;
	}
	
	//Getters and Setters
	
	public int getStatus_ID() {
		return statusId;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public Date getLast_updated() {
		return last_updated;
	}
	
	public void setLast_updated(Date last_updated) {
		this.last_updated = last_updated;
	}
}
	
