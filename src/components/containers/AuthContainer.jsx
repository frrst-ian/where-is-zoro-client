import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/gameApi";
import { UserContext } from "../../context/UserContext";
import Auth from "../ui/Auth";

const AuthContainer = () => {
  const { login } = useContext(UserContext);
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
        login(data.token,data.user);
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
