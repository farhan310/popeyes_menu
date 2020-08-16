const PORT = process.env.PORT || 3000;

const express = require('express');
const pg = require('pg');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.post('/clicks', async function(request, response) {
  const allInfo = request.body;
  console.log(allInfo);

  const result = await db.query(
    `INSERT INTO clicks (userId, time, target, tracking, clickX, clickY) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [
      allInfo.userId,
      allInfo.timeStamp,
      allInfo.eventTarget,
      allInfo.eventPath,
      allInfo.pageX,
      allInfo.pageY,
    ]
  );
  console.log(result);
  response.json({ click: 'tracked' });
});

db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
    id SERIAL PRIMARY KEY,
    time INTEGER NOT NULL,
    target VARCHAR(256) NOT NULL,
    tracking VARCHAR(128) NOT NULL,
    clickX INTEGER NOT NULL,
    clickY INTEGER NOT NULL,
    userId VARCHAR(128) NOT NULL
  );
`);

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
