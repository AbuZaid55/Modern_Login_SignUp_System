import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp';
import VerifyEmail from './Pages/VerifyEmail';
import LogIn from './Pages/LogIn'
import SendResetLink from './Pages/SendResetLink'
import ChangePass from './Pages/ChangePass';
import Page404 from './Pages/Page404';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/verifyEmail' element={<VerifyEmail/>}/>
      <Route path='/logIn' element={<LogIn/>}/>
      <Route path='/sendResetLink' element={<SendResetLink/>}/>
      <Route path='/changePass' element={<ChangePass/>}/>
      <Route path='*' element={<Page404/>}/>
    </Routes>
    <ToastContainer/>
  </>
    
  );
}

export default App;
