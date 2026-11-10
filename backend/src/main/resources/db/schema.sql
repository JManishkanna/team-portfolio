-- =====================================================================
--  FullStack Crew Portfolio API — schema
--
--  Run this once against MySQL 8.0 as an account that can create tables:
--
--    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < backend/src/main/resources/db/schema.sql
--
--  The application itself connects as the least-privileged `crew_app` user
--  created at the bottom of this file.
--
--  Hibernate is configured with ddl-auto=none: these tables are the
--  definition, and nothing at boot time can alter or drop them.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS fullstack_crew
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE fullstack_crew;

-- ---------------------------------------------------------------------
--  Admins. Passwords are BCrypt hashes, never plaintext.
--  Seeded empty on purpose: there is no default account and no shared
--  guessable credential. Create the first one either through the
--  BOOTSTRAP_ADMIN_* env vars (only works while this table is empty)
--  or with the INSERT at the end of this file.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username      VARCHAR(64)     NOT NULL,
  password_hash VARCHAR(100)    NOT NULL,
  display_name  VARCHAR(120)    NOT NULL,
  role          VARCHAR(16)     NOT NULL DEFAULT 'ADMIN',
  enabled       TINYINT(1)      NOT NULL DEFAULT 1,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP       NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_username (username)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
--  Team members — one row per individual portfolio page (/team/:slug).
--  `slug` is the URL identity; every other page derives from it.
--
--  `id` is a short stable string ("m1", "m2") rather than an
--  auto-increment number, because projects, technologies and
--  achievements all store that id inside JSON arrays. A numeric key
--  would make those references rewrite themselves on reseed.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id                     VARCHAR(32)     NOT NULL,
  slug                   VARCHAR(64)     NOT NULL,
  name                   VARCHAR(120)    NOT NULL,
  role                   VARCHAR(120)    NOT NULL,
  specialty              VARCHAR(200)    NOT NULL,
  accent                 VARCHAR(9)      NOT NULL,
  short_bio              VARCHAR(400)    NOT NULL,
  biography              TEXT            NOT NULL,
  expanded_bio           MEDIUMTEXT      NOT NULL,
  approach               TEXT            NULL,
  collaboration          TEXT            NULL,
  photo                  VARCHAR(255)    NOT NULL,
  location               VARCHAR(120)    NULL,
  email                  VARCHAR(160)    NULL,
  github_url             VARCHAR(255)    NULL,
  linkedin_url           VARCHAR(255)    NULL,
  portfolio_url          VARCHAR(255)    NULL,
  skills                 JSON            NOT NULL,
  skill_groups           JSON            NOT NULL,
  featured_project_slugs JSON            NOT NULL,
  achievements           JSON            NOT NULL,
  interests              JSON            NOT NULL,
  strengths              JSON            NOT NULL,
  sort_order             INT             NOT NULL DEFAULT 0,
  created_at             TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at             TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_member_slug (slug),
  KEY idx_member_order (sort_order)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
--  Projects. `contributor_ids` is the single source of truth for who
--  built what — a developer's project list is filtered from here, so a
--  project cannot appear on the wrong person's page.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug            VARCHAR(64)     NOT NULL,
  title           VARCHAR(120)    NOT NULL,
  description     VARCHAR(600)    NOT NULL,
  thumbnail       VARCHAR(255)    NOT NULL,
  technologies    JSON            NOT NULL,
  categories      JSON            NOT NULL,
  contributor_ids JSON            NOT NULL,
  live_demo_url   VARCHAR(255)    NULL,
  github_url      VARCHAR(255)    NULL,
  featured        TINYINT(1)      NOT NULL DEFAULT 0,
  year            VARCHAR(4)      NOT NULL,
  overview        MEDIUMTEXT      NOT NULL,
  problem         MEDIUMTEXT      NOT NULL,
  solution        MEDIUMTEXT      NOT NULL,
  key_features    JSON            NOT NULL,
  contributions   JSON            NOT NULL,
  screenshots     JSON            NULL,
  sort_order      INT             NOT NULL DEFAULT 0,
  created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_project_slug (slug),
  KEY idx_project_order (sort_order),
  KEY idx_project_featured (featured)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS achievements (
  id         VARCHAR(32)     NOT NULL,
  title      VARCHAR(200)    NOT NULL,
  summary    TEXT            NOT NULL,
  kind       VARCHAR(24)     NOT NULL,
  -- Month precision ("2024-02"), matching Achievement.date on the frontend.
  period     VARCHAR(7)      NOT NULL,
  accent     VARCHAR(9)      NOT NULL,
  -- NULL means a crew-wide milestone rather than one person's.
  member_id  VARCHAR(32)     NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_achievement_member (member_id),
  KEY idx_achievement_period (period),
  CONSTRAINT fk_achievement_member
    FOREIGN KEY (member_id) REFERENCES team_members (id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS technologies (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(80)     NOT NULL,
  category    VARCHAR(32)     NOT NULL,
  description VARCHAR(400)    NOT NULL,
  member_ids  JSON            NOT NULL,
  sort_order  INT             NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_technology_name (name),
  KEY idx_technology_category (category)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
--  Editable copy for the home page, navbar, brand and CTA.
--  One JSON document per key, so new copy never needs a migration.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_content (
  content_key VARCHAR(64) NOT NULL,
  payload     JSON        NOT NULL,
  updated_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (content_key)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
--  Contact submissions, stored rather than emailed.
--  `to_member_slug` is NULL for crew-wide enquiries.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  sender_name    VARCHAR(120)    NOT NULL,
  sender_email   VARCHAR(160)    NOT NULL,
  subject        VARCHAR(200)    NOT NULL,
  body           MEDIUMTEXT      NOT NULL,
  project_type   VARCHAR(80)     NULL,
  to_member_slug VARCHAR(64)     NULL,
  read_flag      TINYINT(1)      NOT NULL DEFAULT 0,
  archived       TINYINT(1)      NOT NULL DEFAULT 0,
  source_ip      VARCHAR(45)     NULL,
  received_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_message_received (received_at),
  KEY idx_message_unread (read_flag),
  KEY idx_message_member (to_member_slug)
) ENGINE=InnoDB;

-- =====================================================================
--  Least-privileged application account.
--  CHANGE THE PASSWORD before running — this is the only place a
--  credential appears in this repo, and it is a placeholder, not a secret.
-- =====================================================================
-- CREATE USER IF NOT EXISTS 'crew_app'@'localhost' IDENTIFIED BY 'change-me-now';
-- CREATE USER IF NOT EXISTS 'crew_app'@'127.0.0.1' IDENTIFIED BY 'change-me-now';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON fullstack_crew.* TO 'crew_app'@'localhost';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON fullstack_crew.* TO 'crew_app'@'127.0.0.1';
-- FLUSH PRIVILEGES;

-- =====================================================================
--  Alternative first admin, if you prefer SQL over BOOTSTRAP_ADMIN_*.
--  Generate the hash with:  node -e "console.log(require('bcryptjs').hashSync('your-password',10))"
--  or just let the app create it from env on an empty table.
-- =====================================================================
-- INSERT INTO admin_users (username, password_hash, display_name, role)
-- VALUES ('you', '$2a$10$replace-with-a-real-bcrypt-hash', 'Site Owner', 'ADMIN');
