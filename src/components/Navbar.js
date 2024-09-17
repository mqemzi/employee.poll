import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Nav from "react-bootstrap/Nav";

const Navbar = ({ name, avatarURL, dispatch }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
    navigate("/");
  };

  return (
    <Nav className="navbar" defaultActiveKey="/" as="ul">
      <Nav.Item>
        <Link to="/" className="navbar-link">
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/leaderboard" className="navbar-link">
          Leaderboard
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/add" className="navbar-link">
          New Question
        </Link>
      </Nav.Item>

      <div className="navbar-right">
        <img src={avatarURL} alt={name} className="navbar-avatar" />
        <span className="navbar-username">{name}</span>
        <button className="navbar-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Nav>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const { name, avatarURL } = users[authedUser];

  return {
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(Navbar);
