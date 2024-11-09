import { Outlet } from "react-router-dom";
import Navbar from './Home/Navbar';
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
