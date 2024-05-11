import React, { useState, useEffect } from 'react';
import { BookService } from '../../Services/BookService/BookService'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode'; 

function Books() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');
    const categories = ["FICTION", "NON_FICTION", "SCIENCE_FICTION", "MYSTERY", "HORROR"];
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.role);
            } catch (error) {
                console.error("Token decoding failed:", error);
            }
        }
        fetchBooks();
    }, [selectedCategory]);

    const fetchBooks = () => {
        const fetchFunction = selectedCategory ?
            BookService.searchBooksByCategory(selectedCategory) :
            BookService.getAllBooks();

        fetchFunction
            .then(response => {
                console.log("Fetched books:", response.data); 
                setBooks(response.data);
            })
            .catch(error => {
                console.error(`Error fetching ${selectedCategory ? 'books by category' : 'all books'}:`, error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query) return;
        BookService.searchBooks(query)
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error searching the books:", error));
    };

    const handleDeleteBook = (bookId) => {
        BookService.deleteBook(bookId)
            .then(() => {
                setBooks(books.filter(book => book.id !== bookId));
                alert('Book deleted successfully');
            })
            .catch(error => {
                console.error("Error deleting the book:", error);
                alert('Failed to delete the book. Please try again.');
            });
    };

    const handleUpdateBook = (bookId) => {
        navigate(`/update-book/${bookId}`);
    };

    const handleReserveBook = (bookId) => {
        navigate(`/reserve-book/${bookId}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Books</h1>
            <div className="mb-4 flex flex-wrap">
                <button
                    className={`mr-2 mb-2 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none`}
                    onClick={() => setSelectedCategory('')} // Reset selected category to display all books
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`mr-2 mb-2 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSearch} className="mb-6 flex">
                <input className="w-full p-3 border border-gray-300 rounded-l-md" type="text" placeholder="Search books..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600" type="submit">
                    Search
                </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="p-6 shadow-lg rounded-lg bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-semibold truncate">{book.name}</h3>
                            <div className="flex items-center">
                                
                                    <>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleUpdateBook(book.id)} className="cursor-pointer text-blue-500 hover:text-blue-700 mr-4" size="lg" />
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteBook(book.id)} className="cursor-pointer text-red-500 hover:text-red-700 mr-4" size="lg" />

                                    </>
                            </div>
                        </div>
                        <p className="mb-2"><strong>Author:</strong> {book.author}</p>
                        <p className="mb-2"><strong>Description:</strong> {book.description}</p>
                        <p className="mb-2"><strong>Publication Date:</strong> {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString() : 'N/A'}</p>
                        <p className="mb-2"><strong>ISBN:</strong> {book.isbn}</p>
                        <p className="mb-2"><strong>Category:</strong> {book.category}</p>
                        <p className="mb-4"><strong>Availability Status:</strong> {book.availableCopies > 0 ? 'Available' : 'Not Available'}</p>
                        <p className="mb-4"><strong>Available Copies:</strong> {book.availableCopies}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
