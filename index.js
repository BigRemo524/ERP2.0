const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/receiving', async (req, res) => {
  const receipts = await prisma.receiving.findMany();
  res.json(receipts);
});

app.post('/api/receiving', async (req, res) => {
  const { poNumber, supplier, date } = req.body;
  const receipt = await prisma.receiving.create({
    data: { poNumber, supplier, date: new Date(date) }
  });
  res.json(receipt);
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));