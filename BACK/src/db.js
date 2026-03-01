const { Pool } = require('pg');

// Se crea un pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function getConnection() {
  // Pedimos una conexión libre al pool
  const client = await pool.connect();
  return client;
}

// Exportamos la función para obtener conexión
module.exports = { getConnection };