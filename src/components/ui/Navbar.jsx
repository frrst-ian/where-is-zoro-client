import { User, LogOut, Menu, X, Gamepad2 } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Gamepad2 size={28} strokeWidth={2} />
          <span className="navbar-logo-text">Where's Zoro</span>
        </div>

        {/* Desktop Menu */}
        {user && (
          <div className="navbar-menu">
            <div className="navbar-user">
              <User size={20} />
              <span className="navbar-username">{user.username || user.email}</span>
            </div>
            <button className="navbar-logout" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {user && (
          <button className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {user && mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-user">
            <User size={20} />
            <span>{user.username || user.email}</span>
          </div>
          <button className="navbar-mobile-logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;