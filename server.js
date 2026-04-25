import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create table if it doesn't exist
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        answers JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database table verified/created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

initDb();

app.post('/api/submissions', async (req, res) => {
  try {
    const { email, answers } = req.body;
    
    if (!email || !answers) {
      return res.status(400).json({ error: 'Email and answers are required' });
    }

    const result = await pool.query(
      'INSERT INTO submissions (email, answers) VALUES ($1, $2) RETURNING id',
      [email, JSON.stringify(answers)]
    );

    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
