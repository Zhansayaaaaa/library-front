import React, { useState, useEffect } from 'react';
import { BookService } from '../../Services/BookService/BookService'; // Adjust the import path as needed
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBook() {
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
        photos: [],
        pdf: ''
    });
    const { bookId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        BookService.getBookById(bookId)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => console.error("Error fetching book details:", error));
    }, [bookId]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        BookService.updateBook(bookId, book)
            .then(() => {
                alert('Book updated successfully');
                navigate('/'); // Navigate back to the book list
            })
            .catch(error => console.error('Error updating book:', error));
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-6 shadow-lg rounded-lg bg-white">
  <h1 className="text-2xl font-semibold text-center mb-8">Update Book</h1>
  {book ? (
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
      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="photos" value={book.photos ? book.photos[0] : ''} onChange={handleChange} placeholder="Photo URL" />
      <input className="w-full p-2 border border-gray-300 rounded-md" type="text" name="pdf" value={book.pdf} onChange={handleChange} placeholder="PDF Link" />
      <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" type="submit">Update Book</button>
    </form>
  ) : (
    <p className="text-center">Loading book details...</p>
  )}
</div>

    );
}

export default UpdateBook;
