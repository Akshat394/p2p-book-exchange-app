import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import Icon from './Icon';
import { useAuth } from '../context/AuthContext';

const Form = ({ type = 'login' }) => {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'owner',
    mobile: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (type === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          mobile: formData.mobile
        });

        if (!result.success) {
          throw new Error(result.error);
        }
      } else {
        const result = await login(formData.email, formData.password);
        if (!result.success) {
          throw new Error(result.error);
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        {type === 'register' && (
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name" className={styles.label}>
              <Icon name="faUser" /> Full Name
            </label>
          </div>
        )}
        
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.input}
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email" className={styles.label}>
            <Icon name="faEnvelope" /> Email
          </label>
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="password"
            name="password"
            id="password"
            className={styles.input}
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className={styles.label}>
            <Icon name="faLock" /> Password
          </label>
        </div>
        
        {type === 'register' && (
          <>
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={styles.input}
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword" className={styles.label}>
                <Icon name="faLock" /> Confirm Password
              </label>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                className={styles.input}
                placeholder=" "
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
              />
              <label htmlFor="mobile" className={styles.label}>
                <Icon name="faPhone" /> Mobile Number
              </label>
            </div>
            
            <div className={styles.inputGroup}>
              <select
                name="role"
                id="role"
                className={styles.input}
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="owner">Book Owner</option>
                <option value="seeker">Book Seeker</option>
              </select>
              <label htmlFor="role" className={styles.label}>
                <Icon name="faUserTag" /> Role
              </label>
            </div>
          </>
        )}
        
        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? (
            <Icon name="faSpinner" spin />
          ) : (
            type === 'login' ? 'Sign In' : 'Sign Up'
          )}
        </button>
        
        <div className={styles.switch}>
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <Link href="/register">Sign up</Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login">Sign in</Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form; 