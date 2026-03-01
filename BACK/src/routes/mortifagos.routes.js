const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");
router.get("/", async (req, res) => {
  let conn;

  try {
     conn = await getConnection();
     const result = await conn.query(`
      SELECT
        ID          AS "id",
        NOMBRE      AS "nombre",
        ESTADO   AS "estado",
        SANGRE AS "sangre",
        ESPECIALIDAD      AS "especialidad",
        ANTECEDENTES      AS "antecedentes",
        IMAGEN AS "imagen"
      FROM MORTIFAGOS
      ORDER BY NOMBRE, ESTADO
    `);

    res.json(result.rows);

  } catch (e) {
    
    res.status(500).json({
      error: "Error listando mortifagos",
      details: e.message
    });

  } finally {
   
    if (conn) await conn.release();
  }
});

router.get("/sangre", async (req, res) => {

  let conn;

  try {

    conn = await getConnection();


    const result = await conn.query(`
      SELECT DISTINCT
        SANGRE AS "sangre"
      FROM MORTIFAGOS
    `);

    res.json(result.rows.map(r => r.sangre));

  } catch (e) {
    res.status(500).json({
      error: "Error listando sangre",
      details: e.message
    });

  } finally {
    if (conn) await conn.release();
  }
});

router.get("/buscar/:termino", async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const termino = `%${req.params.termino.toLowerCase()}%`; // Los % permiten buscar "atrix" y encontrar "Bellatrix"
    const result = await conn.query(`
      SELECT ID as "id", NOMBRE as "nombre",
      ESTADO as "estado", SANGRE as "sangre", 
      ESPECIALIDAD as "especialidad",
      ANTECEDENTES as "antecedentes",
      IMAGEN as "imagen"
      FROM MORTIFAGOS 
      WHERE LOWER(NOMBRE) LIKE $1
    `, [termino]);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({
      error: "Error obteniendo nombre",
      details: e.message
    });

  } finally {

    if (conn) await conn.release();
  }
});

router.get("/estado/:estado", async (req, res) => {

  let conn;

  try {
    conn = await getConnection();
   const estado = req.params.estado;
    const result = await conn.query(
      `
      SELECT
        ID          AS "id",
        NOMBRE      AS "nombre",
        ESTADO   AS "estado",
        SANGRE AS "sangre",
        ESPECIALIDAD      AS "especialidad",
        ANTECEDENTES       AS "antecedentes",
        IMAGEN AS "imagen"
      FROM MORTIFAGOS
      WHERE ESTADO = $1
      ORDER BY NOMBRE
      `,
      [estado] // parámetro bind
    );

     res.json(result.rows);

  } catch (e) {
    res.status(500).json({
      error: "Error filtrando por estado",
      details: e.message
    });

  } finally {

    if (conn) await conn.release();
  }
});

module.exports = router;
