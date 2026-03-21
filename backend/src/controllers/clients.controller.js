const db = require('../config/db');

async function list(req, res) {
    try {
        const result = await db.query(
            'SELECT * FROM clientes ORDER BY name ASC'
        );
        return res.json(result.rows);
    } catch (err){
        return res.status(500).json({error: 'Erro interno do servidor.'});
    }
}

async function create(req, res) {
    const { name, email, phone } = req.body;

    if (!name){
        return res.status(400).json({ error: 'Nome é obrigatório. '});
    }

    try {
        const result = await db.query(
            `INSERT INTO clients (name, email, phone)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, email, phone]
        );
        return res.status(201).json(result.rows[0]);
    }catch (err){
        return res.status(500).json({ error: 'Erro interno do servidor.'});
    }
}

async function update(req, res) {
  const { id }                 = req.params;
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome é obrigatório.' });
  }

  try {
    const result = await db.query(
      `UPDATE clients SET name = $1, email = $2, phone = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}