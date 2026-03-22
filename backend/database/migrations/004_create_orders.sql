-- ============================================================
-- MIGRATION 004 — Tabela de ordens de serviço
-- É a tabela central do sistema. Depende das três anteriores,
-- por isso deve ser criada POR ÚLTIMO.
--
-- Relacionamentos:
--   client_id  → qual cliente solicitou
--   service_id → qual serviço será executado
--   user_id    → qual funcionário abriu a OS
--
-- ON DELETE RESTRICT: impede deletar um cliente/serviço/user
-- enquanto houver uma OS vinculada a ele. Protege a integridade.
--
-- CHECK em status: o banco só aceita esses 4 valores exatos.
-- Se o backend tentar salvar "done" ou "ok", o banco rejeita.
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  id          SERIAL       PRIMARY KEY,

  client_id   INT          NOT NULL
                REFERENCES clients(id)  ON DELETE RESTRICT,

  service_id  INT          NOT NULL
                REFERENCES services(id) ON DELETE RESTRICT,

  user_id     INT          NOT NULL
                REFERENCES users(id)    ON DELETE RESTRICT,

  status      VARCHAR(20)  NOT NULL DEFAULT 'pending'
                CONSTRAINT valid_status
                CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),

  description TEXT,

  created_at  TIMESTAMP    DEFAULT NOW(),
  updated_at  TIMESTAMP    DEFAULT NOW()
);
