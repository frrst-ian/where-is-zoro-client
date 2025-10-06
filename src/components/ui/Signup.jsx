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
      <form className="signup" onSubmit={onSubmit}>
        {error && <div className="message-box message-error"> {error}</div>}
        <h1 className="form-heading">Create your account</h1>
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
          {submitting ? "Loading..." : "Sign up"}
        </button>

        <a className="btn" rel="noopener noreferrer" href="/login">
          I already have an account
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            fill="none"
            viewBox="0 0 16 16"
            className="icon page_arrowRight__4KrB_"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75"
            ></path>
          </svg>
        </a>
      </form>
    </div>
  );
};

export default Signup;
