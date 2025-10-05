import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/gameApi";
import Auth from "../ui/Auth";

const AuthContainer = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    auth(identifier, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/game");
      })
      .catch((err) => {
        console.log("Full error response:", err);
        setError(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Auth
        error={error}
        onSubmit={handleSubmit}
        setIdentifier={setIdentifier}
        identifier={identifier}
        password={password}
        setPassword={setPassword}
        submitting={submitting}
      />
    </>
  );
};

export default AuthContainer;
