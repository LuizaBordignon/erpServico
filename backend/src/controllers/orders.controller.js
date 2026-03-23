const db = require ('../config/db');

const SELECT_ORDER = `
  SELECT
    o.id, o.status, o.description, o.created_at, o.updated_at,
    c.id AS client_id, c.name AS client_name, c.phone AS client_phone,
    s.id AS service_id, s.name AS service_name, s.price,
    u.id AS user_id, u.name AS created_by
  FROM orders o
  JOIN clients  c ON o.client_id  = c.id
  JOIN services s ON o.service_id = s.id
  JOIN users    u ON o.user_id    = u.id
`;

async function list(req, res) {
  try {
    const { status } = req.query;
    let query  = SELECT_ORDER;
    let params = [];

    if (status) {
      query  += ' WHERE o.status = $1';
      params  = [status];
    }

    query += ' ORDER BY o.created_at DESC';

    const result = await db.query(query, params);
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar ordens:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function create(req, res){
  const { client_id, service_id, description } = req.body;
  const user_id = req.userId;

  if (!client_id || !service_id){
    return res.status(400).json({error: 'Cliente e serviço são obrigatórios.' });
  }

  try {
    const insert = await db.query(
      `INSERT INTO orders(client_id, service_id, user_id, description)
      VALUES ($1, $2, $3, $4) RETURNING id`,
      [client_id, service_id, user_id, description]
    );

   const result = await db.query(
      SELECT_ORDER + ' WHERE o.id = $1',
      [insert.rows[0].id]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar ordem:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function updateStatus(req, res){
  const { id } = req.params;
  const { status } = req.body;

  const valid = ['pending', 'in_progress', 'completed', 'cancelled'];

  if (!valid.includes(status)) {
    return res.status(400).json({ error: `Status inválido. Use: ${valid.join(', ')}` });
  }

  try {
    const result = await db.query(
      `UPDATE orders SET status = $1, updated_at = NOW()
       WHERE id = $2 RETURNING id, status, updated_at`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ordem não encontrada.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function remove(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM orders WHERE id = $1 RETURNING id',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ordem não encontrada.' });
    }

    return res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar ordem:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

module.exports = { list, create, updateStatus, remove };
