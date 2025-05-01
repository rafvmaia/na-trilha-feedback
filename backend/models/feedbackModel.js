import pool from '../config/db.js';

// ✅ Criar novo feedback
export const createFeedback = async (feedbackData) => {
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
  } = feedbackData;

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
  return result.rows[0];
};

// ✅ Buscar todos os feedbacks
export const findAllFeedbacks = async () => {
  const query = 'SELECT * FROM feedbacks ORDER BY id DESC';
  const result = await pool.query(query);
  return result.rows;
};

// ✅ Buscar um feedback específico pelo ID
export const findFeedbackById = async (id) => {
  const query = 'SELECT * FROM feedbacks WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
