import React, { useState } from 'react';
import { BookService } from '../../Services/BookService/BookService';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const categoryOptions = [
    { label: "Fiction", value: "FICTION" },
    { label: "Non-Fiction", value: "NON_FICTION" },
    { label: "Science Fiction", value: "SCIENCE_FICTION" },
    { label: "Mystery", value: "MYSTERY" },
    { label: "Horror", value: "HORROR" }
  ];
  
  const [book, setBook] = useState({
    name: '',
    author: '',
    description: '',
    publicationDate: '',
    isbn: '',
    category: '',
    availabilityStatus: '',
    availableCopies: '',
    photos: [],
    pdf: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState(''); // For error handling

  const handleChange = (e) => {
    if (e.target.name === 'photos') {
      // Handle photo URLs as an array
      setBook({ ...book, [e.target.name]: e.target.value.split(',') });
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BookService.createBook(book);
      alert('Book added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add the book. Please try again.'); // User-friendly error message
    }
  };
  

  return (
    <div className="max-w-lg mx-auto my-10 p-6 shadow-lg rounded-lg bg-white">
    <h1 className="text-2xl font-semibold text-center mb-8">Add New Book</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="name" value={book.name} onChange={handleChange} placeholder="Name" required />
      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
      <textarea className="w-full p-2 border border-gray-300 rounded-md" name="description" value={book.description} onChange={handleChange} placeholder="Description" required />
      <input className="w-full p-2 border border-gray-300 rounded-md" type="date" name="publicationDate" value={book.publicationDate} onChange={handleChange} required />
      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="isbn" value={book.isbn} onChange={handleChange} placeholder="ISBN" required />
      <select
  className="w-full p-2 border border-gray-300 rounded-md"
  name="category"
  value={book.category}
  onChange={handleChange}
  required
>
  <option value="">Select a Category</option>
  {categoryOptions.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>

      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="availabilityStatus" value={book.availabilityStatus} onChange={handleChange} placeholder="Availability Status" required />
      <input className="w-full p-2 border border-gray-300 rounded-md" type="number" name="availableCopies" value={book.availableCopies} onChange={handleChange} placeholder="Availability Copies" required />
      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="photo" value={book.photo} onChange={handleChange} placeholder="Photo URL" />
      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="pdf" value={book.pdf} onChange={handleChange} placeholder="PDF Link" />
      <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" type="submit">Add Book</button>
    </form>
    {error && <div className="text-red-500">{error}</div>} {}
    </div>
  );
}

export default AddBook;