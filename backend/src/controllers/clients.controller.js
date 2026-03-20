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