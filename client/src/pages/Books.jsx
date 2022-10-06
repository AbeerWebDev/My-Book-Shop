import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchAllBooks();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8800/books/'+id)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Abeer's Book Shop</h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>AED{book.price}</span>
                        <button className='delete' style={{textDecoration: 'none'}} onClick={()=> handleDelete(book.id)}>Delete</button>
                        <button className='update'><Link style={{textDecoration: 'none'}} to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className='addNewButton'>
                <Link style={{textDecoration: 'none'}} to='/add'>Add New Book</Link>
            </button>
        </div>
    )
}

export default Books