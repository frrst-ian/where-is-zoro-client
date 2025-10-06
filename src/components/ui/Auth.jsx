const Auth = ({
  error,
  onSubmit,
  identifier,
  setIdentifier,
  password,
  setPassword,
  submitting,
}) => {
  return (
    <div className="login">
      {error && <div> {error}</div>}
      <form className="login" onSubmit={onSubmit}>
        <h1 className="form-heading">Login to Where's Zoro</h1>

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
