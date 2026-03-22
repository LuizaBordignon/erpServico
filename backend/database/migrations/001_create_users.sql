-- ============================================================
-- MIGRATION 001 — Tabela de usuários do sistema
-- Quem faz login. Nunca armazenamos a senha em texto puro,
-- apenas o hash gerado pelo bcryptjs no backend.
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL        PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(100)  UNIQUE NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  created_at    TIMESTAMP     DEFAULT NOW()
);
