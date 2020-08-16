const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/clicks', async function(request, response) {
  const allInfo = request.body;
  console.log(allInfo);

  const result = await db.query(
    `INSERT INTO clicks (id, time, target, tracking, clickX, clickY) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [id, time, target, tracking, clickX, clickY]
  );
  console.log(result);
  response.json({ click: 'tracked' });
});

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
