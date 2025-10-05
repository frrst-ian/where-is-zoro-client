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
      </form>
    </div>
  );
};

export default Auth;
