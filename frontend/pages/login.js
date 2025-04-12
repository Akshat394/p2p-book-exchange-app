import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import styles from "../styles/Login.module.css";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setIsLoading(true);

    try {
      const response = await API.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Redirect based on user role
      if (response.data.user.role === "owner") {
        router.push("/owner-dashboard");
      } else {
        router.push("/seeker-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login - P2P Book Exchange</title>
        <meta name="description" content="Login to your P2P Book Exchange account" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Welcome Back!</h1>
            <p>Join our community of book lovers and start exchanging books today.</p>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h2>Login to Your Account</h2>
            <p className={styles.subtitle}>Enter your credentials to access your account</p>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
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
                    placeholder="Enter your password"
                    required
                  />
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
                    <Icon name="log-in" className={styles.buttonIcon} />
                    Login
                  </>
                )}
              </button>
            </form>

            <div className={styles.formFooter}>
              <p>Don't have an account? <a href="/register" className={styles.link}>Register here</a></p>
              <a href="/forgot-password" className={styles.forgotPassword}>Forgot Password?</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
