import express from 'express';
import pkg from 'pg';
import fs from 'fs';

const { Client } = pkg;

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req,res)=> {
  res.json({message: "Hello from proxmox server!"});
});


app.get('/evolution', async (req,res) => {
  const client = new Client({
    user: 'postgres',
    host: '192.168.50.20',
    database: 'sleevetrack',
    password: 'daeGh@id379@@'
  })
  await client.connect();

  const q = await client.query('select * from evolution');
  if (q.rowCount > 0) {
    console.log(q);
    res.json({rows : q.rows});
  }
  await client.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});