import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';

import Products from './components/Products/Products';
import Login from './components/Login/Login'

import { UserProvider } from './context/UserContext/UserState';
import { GlobalProvider } from './context/GlobalState';
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <GlobalProvider>
        <UserProvider>
        <Routes>
            <Route path="/products" element={<Products />} />
            <Route path='/' element={<Login/>}/>
          </Routes>
        </UserProvider>
        </GlobalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;