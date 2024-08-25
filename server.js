const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/items', itemRoutes);

// async function insert()
// {
//   await Item.create({"name": "Sample Item",
//   "description": "This is a sample item.",
//   "quantity": 10
//   });
// }
// insert();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
