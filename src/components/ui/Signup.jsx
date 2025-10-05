const Signup = ({
  error,
  onSubmit,
  email,
  setEmail,
  password,
  setUsername,
  username,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  submitting,
}) => {
  return (
    <div className="signup">
      {error && <div> {error}</div>}
      <form className="signup" onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          name="username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
         <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button
          className="btn --btn-signup"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
