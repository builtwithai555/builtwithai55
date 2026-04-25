import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function viewData() {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
    
    console.log(`\n=== Database Submissions (${result.rows.length} total) ===\n`);
    
    if (result.rows.length > 0) {
      // Format the data nicely for the console
      const formattedData = result.rows.map(row => ({
        ID: row.id,
        Email: row.email,
        Goal: row.answers?.goal || 'N/A',
        Age: row.answers?.age || 'N/A',
        Experience: row.answers?.experience || 'N/A',
        Date: new Date(row.created_at).toLocaleString()
      }));
      
      console.table(formattedData);
    } else {
      console.log('No submissions found yet. Try completing the quiz!');
    }
  } catch (err) {
    console.error('Error fetching data:', err.message);
  } finally {
    await pool.end();
  }
}

viewData();
