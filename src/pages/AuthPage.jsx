import React, { useState } from 'react';
const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For SignUp only

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (call backend API)
    console.log({ email, password });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here (call backend API)
    console.log({ name, email, password });
  };

  return (
    <div>
      <h2>{isLoginForm ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={isLoginForm ? handleLoginSubmit : handleSignUpSubmit}>
        {!isLoginForm && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLoginForm ? 'Login' : 'Sign Up'}</button>
      </form>

      <button onClick={() => setIsLoginForm(!isLoginForm)}>
        {isLoginForm ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  );
};

export default AuthPage;
