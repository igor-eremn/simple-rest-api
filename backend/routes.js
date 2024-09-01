const express = require('express');

module.exports = (client) => {
  const router = express.Router();
  const { ObjectId } = require('mongodb');

  // Create a new book
  router.post('/', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('DB1').collection('books');
      const result = await collection.insertOne(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    } finally {
      await client.close();
    }
  });

  // Get all books
  router.get('/', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('DB1').collection('books');
      const books = await collection.find().toArray();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await client.close();
    }
  });

  // Get a single book by ID
  router.get('/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        await client.connect();
        const collection = client.db('DB1').collection('books');

        const book = await collection.findOne({ _id: new ObjectId(bookId) });

        if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  // Update a book by ID
  router.put('/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body;

    try {
        await client.connect();
        const collection = client.db('DB1').collection('books');

        const result = await collection.updateOne(
        { _id: new ObjectId(bookId) },
        { $set: updatedData }
        );

        if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  // Delete a book by ID
  router.delete('/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
      await client.connect();
      const collection = client.db('DB1').collection('books');
      
      const result = await collection.deleteOne({ _id: new ObjectId(bookId) });
      if (result.deletedCount === 0) return res.status(404).json({ message: 'Book not found' });
      res.json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await client.close();
    }
  });

  return router;
};
