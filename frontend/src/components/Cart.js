import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Cart.css';

const Cart = ({ items, onRemoveItem }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    Swal.fire({
      title: 'Thank you for your purchase!',
      text: 'Your order has been successfully processed',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e60012',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      items.forEach(item => onRemoveItem(item.cartId));
      navigate('/');
    });
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <FaArrowLeft /> Back to Store
        </button>
        <h2>Shopping Cart</h2>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-content">
            <button className="continue-shopping" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.cartId} className="cart-item">
                <img src={item.src} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="item-price">${item.price}</div>
                <button 
                  className="remove-item"
                  onClick={() => onRemoveItem(item.cartId)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;