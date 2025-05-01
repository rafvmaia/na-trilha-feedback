import pool from '../config/db.js';

export const createUser = async (userData) => {
  const { nome, email, senhaHash } = userData;

  const query = `
  INSERT INTO users (nome, email, senha)
  VALUES ($1, $2, $3)
  RETURNING id, nome, email, criado_at;
`;


  const values = [nome, email, senhaHash];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
