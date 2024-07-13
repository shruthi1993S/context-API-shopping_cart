// CartPage.js
import React from 'react';
import { useCart } from './CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
