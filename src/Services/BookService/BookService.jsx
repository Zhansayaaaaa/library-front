import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/v1/admin/books';

const createBook = (bookData) => {
    return axios.post(BASE_URL, bookData);
};

const getBookById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

const getAllBooks = () => {
    return axios.get(BASE_URL);
};

const updateBook = (id, bookData) => {
    return axios.put(`${BASE_URL}/${id}`, bookData);
};

const deleteBook = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

const searchBooks = (query) => {
    return axios.get(`${BASE_URL}/search?query=${query}`);
};

const incrementAvailableCopies = (bookId) => {
    return axios.post(`${BASE_URL}/books/${bookId}/increment`);
  };

const searchBooksByCategory = (category) => {
    return axios.get(`${BASE_URL}/category?category=${encodeURIComponent(category)}`);
};


export const BookService = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook,
    searchBooks,
    incrementAvailableCopies,
    searchBooksByCategory,
};
