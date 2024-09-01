import React, { useState } from 'react';

const FindBook = () => {
  const [book, setBook] = useState(null);
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBook = async (bookId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/library/${bookId}`);
      if (!response.ok) {
        throw new Error('Book not found');
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      setError(error.message);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBook(id);
  };

  return (
    <div>
      <h2>Find Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter book ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Find Book</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {book && !loading && !error && (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
        </div>
      )}
    </div>
  );
};

export default FindBook;
