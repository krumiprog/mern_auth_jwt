import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { getLogged } = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      await getLogged();
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
