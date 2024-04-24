import Protected from './Components/Private_route.jsx';
import Navbar from './Components/navbar';
import Connect from './Components/connect';
import Alert from './Components/Alert';
import Signup from './Components/sign_up';
import Login from './Components/login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FirebaseProvider from './Context/Firebase.jsx'
import Loader from './Components/loading.jsx';
import './app.css';


function App() {
  return (
    <>
      <Router Basename='/database'>
        <FirebaseProvider>
          <Navbar />
          <Loader/>
          <Alert />
          <Routes>
            <Route exact path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/connect' element={
              <Protected>
                <Connect/>
              </Protected>
            } />
          </Routes>
        </FirebaseProvider>
      </Router>
    </>
  )
}
export default App