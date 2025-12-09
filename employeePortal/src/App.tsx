import { Router } from "./Router";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Router />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnFocusLoss
        pauseOnHover
      />
    </>
  )
}

export default App


