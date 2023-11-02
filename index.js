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
    // console.log(q);
    res.json({rows : q.rows});
  }
  await client.end();
});

app.get('/insert', async (req,res) => {
  const date = req.query.date;
  const poids = req.query.poids;
  const client = new Client({
    user: 'postgres',
    host: '192.168.50.20',
    database: 'sleevetrack',
    password: 'daeGh@id379@@'
  })
  await client.connect();
  const query = 'insert into evolution (date,poids) values ($1,$2)';
  const values = [date,poids];
  const q = await client.query(query,values);
  await client.end();
  console.log("insert",date,poids);
  res.send({message : 'ok'});
  
});

app.get('/delete', async(req,res) => {
  const id = req.query.id.trim();
  console.log('delete id ',id);
  const client = new Client({
    user: 'postgres',
    host: '192.168.50.20',
    database: 'sleevetrack',
    password: 'daeGh@id379@@'
  })
  const query = 'delete from evolution where id IN ($1)';
  const values = [id];
  try {
    // console.log('query');
    await client.connect();
    const q = await client.query(query,values);
  }
  catch (e) {
    console.error(e);
  }
  
  res.send({message: `id : ${id} deleted`})
  await client.end();
  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});