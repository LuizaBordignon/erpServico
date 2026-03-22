const db = require('../config/db');

async function list(req, res){
    try{
        const result = await db.query(
            'SELECT * FROM services ORDER BY name ASC'
        );
        return res.json(result.rows);
    } catch (err){
        console.error('Erro ao listar serviços:', err);
        return res.status(500).json({error: 'Erro interno do servidor'});
    }
}

async function create(req, res){
    const { name, description, price } = req.body;

    if(!name || price === undefined ){
        return res.status(400).json({ error: 'Nome e preço são obrigatórios.'});
    }

    try{
        const resutl = await db.query(
            `INSERT INTO services (name, description, price)
            VALUES ($1,$2,$3)
            returning *`,
            [name, description, price]
        );
        return res.status(201).json(result.rows[0]);
    } catch(err){
        console.error('Erro ao criar serviço:', err);
        return res.status(500).json({ error: 'Erro interno do servidor.'});
    }
}

async function update(req, res){
    const { id } = req.params;
    const { name, description, price } = req.body;

    if(!name || price === undefined){
        return res.status(400).json({ error: 'Nome e preço são obrigatórios.'});
    }

try {
    const result = await db.query(
      `UPDATE services SET name = $1, description = $2, price = $3
       WHERE id = $4
       RETURNING *`,
      [name, description, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar serviço:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
