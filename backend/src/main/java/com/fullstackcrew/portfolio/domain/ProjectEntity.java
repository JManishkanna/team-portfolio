package com.fullstackcrew.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.List;

/**
 * A team project and its full case study. contributorIds is the only place
 * project ownership is recorded, so /team/:slug/projects and the case-study
 * contributor list can never disagree with each other.
 */
@Entity
@Table(name = "projects")
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 64, unique = true)
    private String slug;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false, length = 600)
    private String description;

    @Column(nullable = false, length = 255)
    private String thumbnail;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private List<String> technologies = List.of();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private List<String> categories = List.of();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "contributor_ids", nullable = false)
    private List<String> contributorIds = List.of();

    @Column(name = "live_demo_url", length = 255)
    private String liveDemoUrl;

    @Column(name = "github_url", length = 255)
    private String githubUrl;

    @Column(nullable = false)
    private boolean featured;

    @Column(nullable = false, length = 4)
    private String year;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String overview;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String problem;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String solution;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "key_features", nullable = false)
    private List<String> keyFeatures = List.of();

    /** [{ "memberId": "m1", "note": "..." }] — what each contributor did. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private List<Contribution> contributions = List.of();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "JSON")
    private List<String> screenshots;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    /** Nested because it only ever lives inside this project's JSON column. */
    public record Contribution(String memberId, String note) {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }
    public List<String> getTechnologies() { return technologies; }
    public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }
    public List<String> getContributorIds() { return contributorIds; }
    public void setContributorIds(List<String> contributorIds) { this.contributorIds = contributorIds; }
    public String getLiveDemoUrl() { return liveDemoUrl; }
    public void setLiveDemoUrl(String liveDemoUrl) { this.liveDemoUrl = liveDemoUrl; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }
    public String getProblem() { return problem; }
    public void setProblem(String problem) { this.problem = problem; }
    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }
    public List<String> getKeyFeatures() { return keyFeatures; }
    public void setKeyFeatures(List<String> keyFeatures) { this.keyFeatures = keyFeatures; }
    public List<Contribution> getContributions() { return contributions; }
    public void setContributions(List<Contribution> contributions) { this.contributions = contributions; }
    public List<String> getScreenshots() { return screenshots; }
    public void setScreenshots(List<String> screenshots) { this.screenshots = screenshots; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
