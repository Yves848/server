import pkg from 'pg';
import fs from 'fs';

const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sleevetrack',
  password: 'daeGh@id379@@'
})

await client.connect();

const res = await client.query('select * from evolution');
if (res.rowCount > 0) {
  console.log(res.rows[0].date, res.rows[0].poids);
}

const text = 'INSERT INTO evolution (date, poids) VALUES ($1,$2) RETURNING *';
// const values = ['2023-10-25', '116.8'];


// const res2 = await client.query(text, values)
// console.log(res2.rows[0])

const poids = JSON.parse(fs.readFileSync('./poids.json'));
for(const poid of poids) {
  // console.log(`Date : ${poid.date} - Poids : ${poid.poids}`);
  const res2 = await client.query(text, [poid.date,poid.poids])
  console.log(res2.rows[0])
};
await client.end();