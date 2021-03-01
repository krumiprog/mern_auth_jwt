import { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/users').then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.username} : {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default User;
