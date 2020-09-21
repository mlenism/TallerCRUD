const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'psfdpnpmafbozm',
  host: 'ec2-54-164-134-207.compute-1.amazonaws.com',
  database: 'd2gkepj777fvip',
  password: '139a536159b0fbffed091970603d4740f1fdbe3f735872eb77f6855c3b14b093',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.put('/Create', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.post('/Update', async (req, res) => {
  const {id, nombre, apellido, numid} = req.body;
  await pool.query(
    `UPDATE pacientes SET nombre = '${nombre}', apellido = '${apellido}', numid = '${numid}' WHERE id = '${id}'`
  );
  res.send('ACTUALIZADO');
});

router.get('/Read', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.delete('/Delete', async (req, res) => {
  const { id } = req.body;
  await pool.query(
    `DELETE FROM pacientes WHERE id = '${id}'`
  );
  res.send('BORRADO');
});