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