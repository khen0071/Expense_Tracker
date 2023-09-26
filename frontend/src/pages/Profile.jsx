import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUpdateUserMutation } from "../features/api/user/userSlice";
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

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [update, { isLoading }] = useUpdateUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await update({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
      toast.success("Profile Updated");
    } catch (error) {
      toast.error("Cannot Update Profile");
    }
  };

  const isDisabled = !email || password.length < 5 || isLoading;

  return (
    <>
      <motion.div
        variants={formVariant}
        initial="initial"
        animate="animate"
        className="profileContainer min-h-screen flex justify-center items-center">
        <div className="border-2 border-white p-10 bg-blue-300/20">
          <h1 className="text-center text-[24px] text-slate-300 font-bold uppercase">
            Update Profile
          </h1>
          {/* <h1 className="text-center text-[18px] text-white font-bold pb-1 mb-3 uppercase border-b-2">
            Sign Up
          </h1> */}

          <form onSubmit={onSubmit}>
            <div className="my-3">
              <label className="text-slate-300 text-[14px] font-semibold">
                Username
              </label>
              <input
                className="w-full border-4 bg-slate-100/30 text-white border-slate-300 mt-1 p-[8px]"
                type="text"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
              Update <i className="fa-solid fa-arrow-right form_icon"></i>
            </button>
          </form>

          <div className="text-center pt-3">
            <p className="text-white font-semibold text-[12px]">
              Back to{" "}
              <Link to="/login">
                <span className="text-blue-300 cursor-pointer uppercase underline text-[14px]">
                  Dashboard
                </span>
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
