package com.project.taskify.models;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "archivedTasks")
public class ArchivedTaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int archivedTask_ID;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private String priority;

    @Column(nullable = false)
    private Date creation_date;

    @Column(nullable = false)
    private Date due_date;

    @Column(nullable = false)
    private int userId;

    private LocalDate completionDate;


    public int getArchivedTask_ID() {
        return archivedTask_ID;
    }

    public void setArchivedTask_ID(int archivedTask_ID) {
        this.archivedTask_ID = archivedTask_ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }
}
