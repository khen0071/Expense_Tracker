import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/api/user/userSlice";
import { logout } from "../features/api/user/authSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col text-center md:text-start md:flex-row items-center justify-between pb-6">
        <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-4 justify-center items-center text-[20px] md:flex-row">
          <Link to="/">
            <i className="fa-solid fa-house w-[50px] h-[50px] rounded-full bg-green-500 flex justify-center items-center"></i>
          </Link>
          <div className="">
            <h1 className="text-[18px] md:text-[24px] font-bold capitalize">
              {userInfo.name}
            </h1>
            <p className="text-[12px] md:text-[14px] text-slate-500">
              Welcome to your Dashboard
            </p>
          </div>
        </div>

        {userInfo && (
          <div className="flex items-center md:justify-center space-x-3 pt-3 md:pt-0 justify-between">
            <Link to="/profile">
              <button className="btn btn-info">Profile</button>
            </Link>
            <button onClick={logoutHandler} className="btn btn-error">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
