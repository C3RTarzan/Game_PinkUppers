import './assets/scss/_global.scss';

/* React */
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';

/*Pages*/
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './context/UserContext';
import Root from './pages/Root';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path="/root@pnk" element={<Root />} exact />
          <Route path='/*' element={<Home />} />
        </Routes>   
      </UserProvider>   
    </Router>
  );
}

export default App;
