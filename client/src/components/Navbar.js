import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Logout from './Logout';

function Navbar() {
  const { logged } = useContext(AppContext);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {logged ? (
        <>
          <Link to="/users">Users</Link>
          <Logout />
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
