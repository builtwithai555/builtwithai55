import pkg from 'pg';
const { Pool } = pkg;

export default async function handler(req, res) {
  // CORS headers for safety
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    if (req.method === 'POST') {
      const { email, answers } = req.body;

      if (!email || !answers) {
        return res.status(400).json({ error: 'Email and answers are required' });
      }

      const result = await pool.query(
        'INSERT INTO submissions (email, answers) VALUES ($1, $2) RETURNING id',
        [email, JSON.stringify(answers)]
      );
      
      // Close the pool connection to prevent lambda connection leaks
      await pool.end();

      return res.status(201).json({ success: true, id: result.rows[0].id });
      
    } else if (req.method === 'GET') {
      const authHeader = req.headers.authorization;
      const expectedPassword = process.env.ADMIN_PASSWORD || 'getpeptides2026';
      
      if (!authHeader || authHeader !== `Bearer ${expectedPassword}`) {
        await pool.end();
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const result = await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
      await pool.end();
      return res.status(200).json({ success: true, data: result.rows });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Error saving/fetching submission:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
