package com.fullstackcrew.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.LinkedHashMap;

/**
 * Editable copy: brand, navItems, cta, heroHeadline, heroDescription,
 * coreValues, workflow. One JSON document per key, so adding a new piece of
 * site copy is an admin change rather than a migration.
 */
@Entity
@Table(name = "site_content")
public class SiteContentEntity {

    @Id
    @Column(name = "content_key", length = 64)
    private String contentKey;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private LinkedHashMap<String, Object> payload = new LinkedHashMap<>();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public String getContentKey() { return contentKey; }
    public void setContentKey(String contentKey) { this.contentKey = contentKey; }
    public LinkedHashMap<String, Object> getPayload() { return payload; }
    public void setPayload(LinkedHashMap<String, Object> payload) { this.payload = payload; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
