package com.fullstackcrew.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "achievements")
public class AchievementEntity {

    @Id
    @Column(length = 32)
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String summary;

    /** hackathon | certification | milestone | open-source | award */
    @Column(nullable = false, length = 24)
    private String kind;

    /** Month precision, "2024-02", matching Achievement.date on the frontend. */
    @Column(nullable = false, length = 7)
    private String period;

    @Column(nullable = false, length = 9)
    private String accent;

    /** Null means a crew-wide milestone rather than one person's. */
    @Column(name = "member_id", length = 32)
    private String memberId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getKind() { return kind; }
    public void setKind(String kind) { this.kind = kind; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public String getAccent() { return accent; }
    public void setAccent(String accent) { this.accent = accent; }
    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
