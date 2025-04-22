import React, { useState } from 'react';
import { FaTimes, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import './LoginModal.css';
import NintendoLogo from '../media/Nintendo.png';

const LoginModal = ({ onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        // Validar contraseñas
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const registerResponse = await axios.post('http://192.168.44.110:3001/register', {
          nombre_usuario: formData.name,
          email: formData.email,
          password: formData.password
        });

        console.log('Registration successful:', registerResponse.data);
        setIsRegistering(false);
        setError('');
        setFormData(prev => ({
          ...prev,
          name: '',
          confirmPassword: ''
        }));
      } else {
        console.log('Attempting login with:', {
          email: formData.email,
          password: formData.password
        });

        const loginResponse = await axios.post('http://192.168.44.110:3001/login', {
          email: formData.email,
          password: formData.password
        });

        console.log('Server response:', loginResponse.data);

        if (loginResponse.data && loginResponse.data.token) {
          localStorage.setItem('token', loginResponse.data.token);
          
          const userData = loginResponse.data.user || {
            nombre_usuario: loginResponse.data.nombre_usuario,
            email: loginResponse.data.email,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.token}`;
          
          onLogin(userData);
          onClose();
        } else {
          throw new Error('Unexpected server response');
        }
      }
    } catch (err) {
      console.error('Error:', err);
      
      // Traducir mensajes de error comunes
      let errorMessage = err.response?.data?.message || err.message || 'Login error';
      
      // Mapeo completo de mensajes de error
      const errorMessages = {
        'Usuario no encontrado': 'User not found',
        'Credenciales incorrectas': 'Invalid credentials',
        'La contraseña es incorrecta': 'Invalid password',
        'Las contraseñas no coinciden': 'Passwords do not match',
        'El correo electrónico ya está registrado': 'Email is already registered',
        'Error al iniciar sesión': 'Login error',
        'La respuesta del servidor no tiene el formato esperado': 'Unexpected server response',
        'Usuario no encontrado o credenciales incorrectas': 'User not found or invalid credentials',
        // Agregamos más combinaciones posibles
        'Usuario o contraseña incorrectos': 'Invalid username or password',
        'Error de autenticación': 'Authentication error',
        'Error en el servidor': 'Server error',
        'Error de validación': 'Validation error'
      };

      // Traducir el mensaje si existe en el mapeo
      errorMessage = errorMessages[errorMessage] || errorMessage;
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="modal-logo">
            <img 
              src={NintendoLogo}
              alt="Nintendo" 
              style={{ 
                width: '150px',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
          <h2>{isRegistering ? 'Create Account' : 'Sign In'}</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <div className="form-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button" 
            disabled={isLoading}
          >
            {isLoading 
              ? 'Loading...' 
              : (isRegistering ? 'Sign Up' : 'Sign In')
            }
          </button>
        </form>

        <div className="form-footer">
          <p>
            {isRegistering 
              ? 'Already have an account?' 
              : "Don't have an account?"}
            <button 
              className="toggle-form-button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 