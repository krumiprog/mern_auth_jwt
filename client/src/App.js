import Router from './router';
import axios from 'axios';
import { AppContextProvider } from './context/AppContext';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
}

export default App;
