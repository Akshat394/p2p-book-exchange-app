import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import styles from "../styles/Register.module.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "seeker", // Default role
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Redirect based on user role
      if (formData.role === "owner") {
        router.push("/owner-dashboard");
      } else {
        router.push("/seeker-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register - P2P Book Exchange</title>
        <meta name="description" content="Create your P2P Book Exchange account" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Join Our Community</h1>
            <p>Create an account to start exchanging books with fellow readers.</p>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h2>Create Account</h2>
            <p className={styles.subtitle}>Fill in your details to get started</p>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <div className={styles.inputWrapper}>
                  <Icon name="user" className={styles.inputIcon} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <div className={styles.inputWrapper}>
                  <Icon name="mail" className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWrapper}>
                  <Icon name="lock" className={styles.inputIcon} />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <Icon name="lock" className={styles.inputIcon} />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="role">I want to</label>
                <div className={styles.roleSelector}>
                  <button
                    type="button"
                    className={`${styles.roleButton} ${formData.role === "owner" ? styles.active : ""}`}
                    onClick={() => handleChange({ target: { name: "role", value: "owner" } })}
                  >
                    <Icon name="book" className={styles.roleIcon} />
                    Share Books
                  </button>
                  <button
                    type="button"
                    className={`${styles.roleButton} ${formData.role === "seeker" ? styles.active : ""}`}
                    onClick={() => handleChange({ target: { name: "role", value: "seeker" } })}
                  >
                    <Icon name="search" className={styles.roleIcon} />
                    Find Books
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.loadingSpinner}></span>
                ) : (
                  <>
                    <Icon name="user-plus" className={styles.buttonIcon} />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className={styles.formFooter}>
              <p>Already have an account? <a href="/login" className={styles.link}>Login here</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
