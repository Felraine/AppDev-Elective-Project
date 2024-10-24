package com.project.taskify.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tasks")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_ID;
    
    @Column(nullable = false, unique = true)
    private String title;

    @Column(nullable = false, unique = true)
    private String description;

    @Column(nullable = false, unique = true)
    private String priority;

    @Column(nullable = false, unique = true)
    private Date creation_date;

    @Column(nullable = false, unique = true)
    private Date due_date;

    public TaskEntity() {}

    public TaskEntity(String title, String description, String priority,Date creation_date, Date due_date) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.creation_date = creation_date;
        this.due_date = due_date;

    }

    public int getTask_ID() {
        return task_ID;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getPriority(){
        return priority;
    }

    public void setPriority(String priority){
        this.priority = priority;
    }

    public Date getCreation_date(){
        return creation_date;
    }
    public void setCreation_date(Date creation_date){
        this.creation_date = creation_date;
    }

    public Date getDue_date(){
        return due_date;
    }
    public void setDue_date(Date due_date){
        this.due_date = due_date;
    }


    
}
