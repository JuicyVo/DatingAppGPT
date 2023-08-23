console.log ("hi, backend pool online")

const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();


const client = new Client({
  host: 'localhost',
  database: 'gpTinder',
  user: 'williamvo',
});

const db = new Pool(dbParams);

console.log (Pool)

async function listTables() {
  try {
    const client = await db.connect();
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    client.release();

    // Return the list of table names
    return result.rows.map(row => row.table_name);
  } catch (error) {
    console.error('Error listing tables:', error);
    throw error;
  }
}

// Example usage
listTables()
  .then(tableNames => console.log('Tables:', tableNames))
  .catch(error => console.error('Error:', error));


module.exports = db;

