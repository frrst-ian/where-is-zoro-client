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
        login(data.token, data.user);
        navigate("/game");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleGuestLogin = () => {
    let guestId = localStorage.getItem("guestId");

    if (!guestId) {
      guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", guestId);
    }

    const guestUser = {
      id: guestId,
      username: null,
      email: null,
      isGuest: true,
    };
    login(null, guestUser);
    navigate("/game");
  };

  return (
    <Auth
      error={error}
      onSubmit={handleSubmit}
      setIdentifier={setIdentifier}
      identifier={identifier}
      password={password}
      setPassword={setPassword}
      submitting={submitting}
      onGuestLogin={handleGuestLogin}
    />
  );
};

export default AuthContainer;
