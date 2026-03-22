-- ============================================================
-- MIGRATION 003 — Tabela de serviços
-- Catálogo de serviços que podem ser executados.
-- Ex: "Formatação de PC", "Troca de tela", "Limpeza interna".
-- Cada ordem de serviço referencia um serviço daqui.
-- ============================================================

CREATE TABLE IF NOT EXISTS services (
  id          SERIAL        PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at  TIMESTAMP     DEFAULT NOW()
);
