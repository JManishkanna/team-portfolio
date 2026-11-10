package com.fullstackcrew.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * One row per individual portfolio page. The slug is the URL identity that
 * /team/:slug resolves against, and the id is the short stable string
 * ("m1") that projects, technologies and achievements reference.
 */
@Entity
@Table(name = "team_members")
public class TeamMemberEntity {

    @Id
    @Column(length = 32)
    private String id;

    @Column(nullable = false, length = 64, unique = true)
    private String slug;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 120)
    private String role;

    @Column(name = "specialty", nullable = false, length = 200)
    private String specialty;

    @Column(nullable = false, length = 9)
    private String accent;

    @Column(name = "short_bio", nullable = false, length = 400)
    private String shortBio;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String biography;

    @Column(name = "expanded_bio", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String expandedBio;

    @Column(columnDefinition = "TEXT")
    private String approach;

    @Column(columnDefinition = "TEXT")
    private String collaboration;

    @Column(nullable = false, length = 255)
    private String photo;

    @Column(length = 120)
    private String location;

    @Column(length = 160)
    private String email;

    @Column(name = "github_url", length = 255)
    private String githubUrl;

    @Column(name = "linkedin_url", length = 255)
    private String linkedinUrl;

    @Column(name = "portfolio_url", length = 255)
    private String portfolioUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private List<String> skills = List.of();

    /** frontend / backend / database / tools -> list of names. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "skill_groups", nullable = false)
    private LinkedHashMap<String, List<String>> skillGroups = new LinkedHashMap<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "featured_project_slugs", nullable = false)
    private List<String> featuredProjectSlugs = List.of();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private List<String> achievements = List.of();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private List<String> interests = List.of();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    private List<String> strengths = List.of();

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getAccent() { return accent; }
    public void setAccent(String accent) { this.accent = accent; }
    public String getShortBio() { return shortBio; }
    public void setShortBio(String shortBio) { this.shortBio = shortBio; }
    public String getBiography() { return biography; }
    public void setBiography(String biography) { this.biography = biography; }
    public String getExpandedBio() { return expandedBio; }
    public void setExpandedBio(String expandedBio) { this.expandedBio = expandedBio; }
    public String getApproach() { return approach; }
    public void setApproach(String approach) { this.approach = approach; }
    public String getCollaboration() { return collaboration; }
    public void setCollaboration(String collaboration) { this.collaboration = collaboration; }
    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public LinkedHashMap<String, List<String>> getSkillGroups() { return skillGroups; }
    public void setSkillGroups(LinkedHashMap<String, List<String>> skillGroups) { this.skillGroups = skillGroups; }
    public List<String> getFeaturedProjectSlugs() { return featuredProjectSlugs; }
    public void setFeaturedProjectSlugs(List<String> featuredProjectSlugs) { this.featuredProjectSlugs = featuredProjectSlugs; }
    public List<String> getAchievements() { return achievements; }
    public void setAchievements(List<String> achievements) { this.achievements = achievements; }
    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }
    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
