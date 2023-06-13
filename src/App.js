import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Books from './components/pages/Books';
import { books } from "./data";
import BookInfo from "./components/pages/BookInfo";
import Cart from './components/pages/Cart';
import React, { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState([])

  function addToCart(book) {
    setCart([...cart, {...book, quantity: 1}])
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id))
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
      item.id === book.id
        ? {
            ...item,
            quantity: +quantity
          }
        : item
      )
    );
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity;
    })
    return counter;
  }

  useEffect(() => {

  }, [cart])

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<BookInfo books={books} addToCart={addToCart} cart={cart} />} />
          <Route path="/cart" element={<Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
