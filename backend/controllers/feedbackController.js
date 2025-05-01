import pool from '../config/db.js';

// Criar novo feedback
export const submitFeedback = async (req, res) => {
  const {
    nome,
    email,
    conteudo_avaliacao,
    criticas,
    baixou_curriculo,
    tema_interesse,
    nota,
    depoimento,
    mais_infos,
  } = req.body;

  try {
    const query = `
      INSERT INTO feedbacks 
      (nome, email, conteudo_avaliacao, criticas, baixou_curriculo, tema_interesse, nota, depoimento, mais_infos)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      nome,
      email,
      conteudo_avaliacao,
      criticas,
      baixou_curriculo,
      tema_interesse,
      nota,
      depoimento,
      mais_infos,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao enviar feedback:', error);
    res.status(500).json({ message: 'Erro ao enviar feedback.' });
  }
};

// Buscar todos os feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedbacks ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error);
    res.status(500).json({ message: 'Erro ao buscar feedbacks.' });
  }
};

// 🔥 Buscar feedback específico por ID
export const getFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM feedbacks WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Feedback não encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar feedback por ID:', error);
    res.status(500).json({ message: 'Erro interno.' });
  }
};
