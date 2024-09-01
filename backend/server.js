const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(express.json());
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  
const bookRoutes = require('./routes.js')(client);
app.use('/library', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});