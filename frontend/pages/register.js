import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import styles from "../styles/Form.module.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "", 
    email: "", 
    password: "", 
    mobile: "", 
    role: "owner"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await API.post("/auth/register", form);
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Head>
        <title>Register - P2P Book Exchange</title>
        <meta name="description" content="Create an account to start exchanging books" />
      </Head>
      <Navbar />
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>
          <Icon name="faUserPlus" /> Register
        </h2>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.inputGroup}>
          <input 
            className={styles.input}
            name="name" 
            placeholder="Full Name" 
            value={form.name}
            onChange={handleChange} 
            required 
          />
          <label className={styles.label}>Full Name</label>
        </div>
        
        <div className={styles.inputGroup}>
          <input 
            className={styles.input}
            name="email" 
            type="email"
            placeholder="Email Address" 
            value={form.email}
            onChange={handleChange} 
            required 
          />
          <label className={styles.label}>Email Address</label>
        </div>
        
        <div className={styles.inputGroup}>
          <input 
            className={styles.input}
            name="mobile" 
            placeholder="Mobile Number" 
            value={form.mobile}
            onChange={handleChange} 
            required 
          />
          <label className={styles.label}>Mobile Number</label>
        </div>
        
        <div className={styles.inputGroup}>
          <input 
            className={styles.input}
            name="password" 
            type="password" 
            placeholder="Password" 
            value={form.password}
            onChange={handleChange} 
            required 
          />
          <label className={styles.label}>Password</label>
        </div>
        
        <div className={styles.inputGroup}>
          <select 
            className={styles.input}
            name="role" 
            value={form.role}
            onChange={handleChange}
          >
            <option value="owner">Book Owner</option>
            <option value="seeker">Book Seeker</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Icon name="faSpinner" className="fa-spin" /> Registering...
            </>
          ) : (
            <>
              <Icon name="faUserPlus" /> Register
            </>
          )}
        </button>
        
        <div className={styles.switch}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}
