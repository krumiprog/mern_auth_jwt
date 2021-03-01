import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [logged, setLogged] = useState(undefined);

  const getLogged = async () => {
    const res = await axios.get('http://localhost:5000/logged');
    setLogged(res.data);
  };

  useEffect(() => {
    getLogged();
  }, []);

  return (
    <AppContext.Provider value={{ logged, getLogged }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
