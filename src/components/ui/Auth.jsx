const Auth = ({
  error,
  onSubmit,
  identifier,
  setIdentifier,
  password,
  setPassword,
  submitting,
  onGuestLogin
}) => {
  return (
    <div className="login">
      <form className="login" onSubmit={onSubmit}>
        <h1 className="form-heading">Login to Where's Zoro</h1>
        {error && <div className="message-box message-error"> {error}</div>}

        <input
          name="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Username or Email"
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
        <button className="btn --btn-login" type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>


        <button
          type="button"
          className="btn --btn-guest"
          onClick={onGuestLogin}
          disabled={submitting}
        >
          Continue as Guest
        </button>

        <a className="btn" rel="noopener noreferrer" href="/signup">
          Don't have an account? Signup
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

export default Auth;
