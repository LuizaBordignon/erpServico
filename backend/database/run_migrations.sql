-- ============================================================
-- RUN ALL MIGRATIONS
-- Execute este arquivo para criar o banco do zero.
-- Ordem importa: orders depende das outras três tabelas.
--
-- Como rodar no psql:
--   \i caminho/para/run_migrations.sql
--
-- Ou via terminal:
--   psql -U postgres -d os_system -f run_migrations.sql
-- ============================================================

\i migrations/001_create_users.sql
\i migrations/002_create_clients.sql
\i migrations/003_create_services.sql
\i migrations/004_create_orders.sql

-- Opcional: popula com dados de teste
-- \i seed.sql
