-- ============================================================
-- MIGRATION 002 — Tabela de clientes
-- Pessoas físicas ou empresas que solicitam ordens de serviço.
-- Não é a mesma coisa que "users" — users são os funcionários
-- que operam o sistema; clients são os atendidos.
-- ============================================================

CREATE TABLE IF NOT EXISTS clients (
  id         SERIAL       PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100),
  phone      VARCHAR(20),
  created_at TIMESTAMP    DEFAULT NOW()
);
