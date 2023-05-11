import './assets/scss/_global.scss';

/* React */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/*Pages*/
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Root from './pages/Root';

/*Context*/
import { UserProvider } from './context/UserContext';



function PrivateRoute({ children, isAuth, replace = false }) {
  const redirectToLogin = () => {
    return <Navigate to="/" replace={replace} />;
  };
  return isAuth ? (
    <>
      {children}
    </>
  ) : (
    redirectToLogin()
  );
}

function App() {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />}/>
          {/* <Route path="/root@pnk" element={<PrivateRoute isAuth={false}><Root /></PrivateRoute>} exact /> */}
          <Route path="/root@pnk" element={<PrivateRoute isAuth={true}><Root /></PrivateRoute>} />
          <Route path='/*' element={<Home />} />
        </Routes>   
      </UserProvider>   
    </Router>
  );
}

export default App;
