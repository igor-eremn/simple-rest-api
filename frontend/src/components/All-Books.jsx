import React, { useState, useEffect } from 'react';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/library/');
      if (!response.ok) {
        console.error('Network response was not ok', {
          status: response.status,
          statusText: response.statusText,
        });
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched books:', data);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete a book based on its ID
  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/library/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Refresh the book list after deletion
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading books...</p> 
      ) : error ? (
        <p>Error: {error}</p>
      ) : books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <button onClick={() => deleteBook(book._id)}>Delete</button>
              {book._id}: {book.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default AllBooks;
