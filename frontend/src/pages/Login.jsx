import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLoginMutation } from "../features/api/user/userSlice";
import { setCredentials } from "../features/api/user/authSlice";
import { toast } from "react-toastify";

const formVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data.message || error?.error);
    }
  };

  const isDisabled = !email || password.length === 0 || isLoading;

  return (
    <>
      <motion.div
        variants={formVariant}
        initial="initial"
        animate="animate"
        className="loginContainer min-h-screen flex justify-center items-center px-3">
        <div className="border-2 border-white p-10 bg-blue-300/20">
          <h1 className="text-center text-[24px] text-slate-300 font-bold uppercase">
            Welcome back
          </h1>
          <div className="flex justify-center items-center"></div>
          <h1 className="text-center text-[18px] text-white font-bold pb-1 mb-3 uppercase border-b-2">
            Sign In
          </h1>

          <form onSubmit={onSubmit}>
            <div className="my-3">
              <label className="text-slate-300 text-[14px] font-semibold">
                Email
              </label>
              <input
                className="w-full border-4 bg-slate-100/30 text-white border-slate-300 mt-1 p-[8px]"
                type="email"
                id="email"
                value={email}
                required
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <label className="text-slate-300 text-[14px] font-semibold">
                Password
              </label>
              <input
                className="w-full border-4 bg-slate-100/30 text-white border-slate-300 mt-1 p-[8px]"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                required
                onChange={onChange}
              />
            </div>
            <div className="text-center">
              <span
                className="text-[14px] text-white font-semibold cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}>
                <i className="fa-solid fa-eye form_icon_eye px-1"></i>
                Show Password
              </span>
            </div>

            <button
              disabled={isDisabled}
              className="btn btn-info font-bold uppercase w-full my-3">
              Sign In <i className="fa-solid fa-arrow-right form_icon"></i>
            </button>
          </form>

          <div className="text-center">
            <p className="text-white font-semibold text-[12px]">
              Don't have an account yet?{" "}
              <Link to="/register">
                <span className="text-blue-300 cursor-pointer uppercase underline text-[14px]">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>

          <div className="text-center mt-3 uppercase">
            <p className="text-white font-semibold text-[12px]">
              Back to{" "}
              <Link to="/">
                <span className="text-blue-300 cursor-pointer text-[14px]">
                  Homepage
                </span>
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
