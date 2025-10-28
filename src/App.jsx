import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { UserLoginPage } from './pages/Login';
import Register from './pages/Register';
import MainNavigate from './pages/user/MainNavigate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className='bg-[#f5f5f5] text-gray-800 font-roboto'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<MainNavigate />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App



// https://www.behance.net/gallery/229035837/Web-Service-BookWormHub
// https://dribbble.com/shots/19864071-BookBase-Digital-Book-Library-Dashboard