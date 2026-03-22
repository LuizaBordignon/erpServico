-- ============================================================
-- SEED — Dados iniciais para desenvolvimento e testes
-- Execute APÓS todas as migrations (001 a 004).
--
-- ATENÇÃO: o password_hash abaixo é só um placeholder visual.
-- Na prática, o backend gera esse hash via bcryptjs antes de
-- salvar. Nunca insira senhas em texto puro aqui.
-- ============================================================

-- Usuário administrador (senha real será gerada pelo backend)
INSERT INTO users (name, email, password_hash) VALUES
  ('Administrador', 'admin@os.com', '$2b$10$placeholder_substituir_pelo_backend');

-- Clientes de exemplo
INSERT INTO clients (name, email, phone) VALUES
  ('João Silva',   'joao@email.com',  '48999990001'),
  ('Maria Costa',  'maria@email.com', '48999990002'),
  ('Pedro Souza',  'pedro@email.com', '48999990003');

-- Serviços de exemplo
INSERT INTO services (name, description, price) VALUES
  ('Formatação de PC',  'Formatação completa com reinstalação de SO e drivers', 150.00),
  ('Troca de tela',     'Substituição de tela de notebook',                     350.00),
  ('Limpeza interna',   'Limpeza de cooler, pasta térmica e componentes',        80.00),
  ('Upgrade de memória','Instalação e configuração de memória RAM adicional',    120.00);

-- Ordens de serviço de exemplo (variedade de status para testar o dashboard)
INSERT INTO orders (client_id, service_id, user_id, status, description) VALUES
  (1, 1, 1, 'pending',     'Cliente relatou lentidão extrema no sistema'),
  (2, 2, 1, 'in_progress', 'Tela com listras verticais após queda'),
  (3, 3, 1, 'completed',   'Computador esquentando muito e desligando sozinho'),
  (1, 4, 1, 'cancelled',   'Cliente cancelou após orçamento');
