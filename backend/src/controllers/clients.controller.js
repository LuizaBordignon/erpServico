const db = require("../config/db");

async function list(req, res) {
  try {
    const result = await db.query("SELECT * FROM clientes ORDER BY name ASC");
    return res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar clientes:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

async function create(req, res) {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório. " });
  }

  try {
    const result = await db.query(
      `INSERT INTO clients (name, email, phone)
            VALUES ($1, $2, $3)
            RETURNING *`,
      [name, email, phone],
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório." });
  }

  try {
    const result = await db.query(
      `UPDATE clients SET name = $1, email = $2, phone = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, phone, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

async function remove(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM clients WHERE id = $1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar cliente:", err);
    if (err.code === "233503") {
      return res
        .status(409)
        .json({ error: "Cliente possui ordens vinculadas." });
    }
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = { list, create, update, remove };
