import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/gameApi";
import { UserContext } from "../../context/UserContext";
import Signup from "../ui/Signup";

const SignupContainer = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    if (password === confirmPassword) {
      signup(email, username, password, confirmPassword)
        .then((data) => {
          login(data.token, data.user);
          navigate("/game");
        })
        .catch((err) => {
          if (err.details && Array.isArray(err.details)) {
            setError(err.details.join("\n"));
          } else {
            setError(err.message);
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      setError("Password doesn't match");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Signup
        error={error}
        onSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setUsername={setUsername}
        username={username}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        submitting={submitting}
      />
    </>
  );
};

export default SignupContainer;
