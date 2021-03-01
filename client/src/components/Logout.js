import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';

function Logout() {
  const { getLogged } = useContext(AppContext);
  const history = useHistory();

  const logout = async () => {
    await axios.post('http://localhost:5000/logout');
    await getLogged();
    history.push('/');
  };

  return <div className="logout" onClick={logout}>Logout</div>;
}

export default Logout;
