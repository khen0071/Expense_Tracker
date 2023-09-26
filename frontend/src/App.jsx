import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ScrollToTop from "./components/ScrollToTop";

import AnimatedPage from "./components/AnimatedPage";
import AnimatedRoutes from "./components/AnimatedRoutes";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <div>
          <AnimatePresence mode="wait">
            <AnimatedPage>
              <AnimatedRoutes />
            </AnimatedPage>
          </AnimatePresence>
        </div>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
