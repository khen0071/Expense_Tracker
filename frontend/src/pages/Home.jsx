import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import laptop from "../assets/laptop2.png";
import screen from "../assets/screen.png";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const homeVariant = {
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

  return (
    <>
      <div className="homeContainer pb-10 px-1">
        <motion.div
          variants={homeVariant}
          initial="initial"
          animate="animate"
          className="min-h-screen max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center py-4 px-2">
            <div>
              <h1 className="gradientOverlay md:text-[28px] sm:text-[20px] text-[13px]">
                Expense Tracker
              </h1>
            </div>

            {userInfo ? (
              <div className="flex space-x-3">
                <Link to="/dashboard">
                  <button className="btn btn-outline btn-success md:text-[16px] text-[12px]">
                    Dashboard
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login">
                  <button className="btn btn-outline btn-success md:text-[16px] text-[12px]">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-outline btn-info md:text-[16px] text-[12px]">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="">
            <div>
              {/* <div className="text-center lg:mb-4">
                <div className="flex space-x-3 justify-center items-center">
                  <p className=" md:text-[20px] lg:text-[28px]">Welcome to </p>
                  <p className="text-green-400 text-[24px] md:text-[30px] lg:text-[40px] font-bold">
                    Expense Tracker
                  </p>
                </div>
              </div> */}

              <div className="flex flex-col lg:flex-row justify-center items-center p-3 rounded-md lg:text-start text-center mb-6 lg:space-y-0 space-y-6 md:my-10 my-6">
                <section className="w-full space-y-3 md:space-y-6">
                  <h1 className="xl:text-[50px] lg:text-[40px] md:text-[30px] text-[22px] font-semibold">
                    Managing Finance Made{" "}
                    <strong className="text-green-500">Simple</strong> &{" "}
                    <strong className="text-green-500">Insightful!</strong>
                  </h1>

                  <p className="text-[12px] md:text-[16px] text-slate-400">
                    Empower individuals and families to take control of their
                    finances, make informed decisions, and achieve financial
                    well-being through graphical data visualization
                  </p>
                </section>

                <section className="w-full md:p-10">
                  <img src={laptop} alt="laptop" />
                </section>
              </div>

              <div className="flex flex-col lg:flex-row items-center lg:space-x-6 m-3">
                <div className="w-1/2 hidden lg:flex">
                  <div className="space-y-3 w-full">
                    <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                      <h1 className="text-[14px] md:text-[16px] font-semibold text-blue-500">
                        1. Graphical Reports
                      </h1>
                      <p className="text-slate-400 md:text-[14px] text-[12px]">
                        - Explore our variety of charts and graphs to visualize
                        your spending patterns.
                      </p>
                    </div>

                    <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                      <h1 className="text-[14px] md:text-[16px] font-semibold text-green-500">
                        2. Expense Tracking
                      </h1>
                      <p className="text-slate-400 md:text-[14px] text-[12px]">
                        - Easily add and categorize your expenses to keep a
                        record of your financial transactions.
                      </p>
                    </div>

                    <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                      <h1 className="text-[14px] md:text-[16px] font-semibold text-orange-500">
                        3. Daily Filter
                      </h1>
                      <p className="text-slate-400 md:text-[14px] text-[12px]">
                        - Monitor your expenses based on a date for a
                        comprehensive financial overview.
                      </p>
                    </div>

                    <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                      <h1 className="text-[14px] md:text-[16px] font-semibold text-yellow-500">
                        4. Visual Insights
                      </h1>
                      <p className="text-slate-400 md:text-[14px] text-[12px]">
                        - Gain valuable insights into your financial life
                        through intuitive data visualization.
                      </p>
                    </div>

                    <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                      <h1 className="text-[14px] md:text-[16px] font-semibold text-teal-500">
                        5. Payment Methods
                      </h1>
                      <p className="text-slate-400 md:text-[14px] text-[12px]">
                        - Monitor your expenses with different type of payments
                        used.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-center mb-4">
                    <div className="flex space-x-3 justify-center items-center">
                      <p className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-blue-200">
                        Visualize Your Expenses
                      </p>
                    </div>
                    <p className="text-[12px] md:text-[14px] text-slate-400">
                      Get a clear picture of your spending habits with our
                      powerful graphical tools
                    </p>
                  </div>
                  <div className="border-2 p-2 border-blue-300 bg-slate-500">
                    <img src={screen} alt="screen" />
                  </div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-6 sm:space-y-0 text-center lg:pt-0  pt-6 lg:text-start">
                    <div className="space-y-3 w-full">
                      <div className="block lg:hidden space-y-3">
                        <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                          <h1 className="text-[14px] md:text-[16px] font-semibold text-blue-500">
                            1. Graphical Reports
                          </h1>
                          <p className="text-slate-400 md:text-[14px] text-[12px]">
                            - Explore our variety of charts and graphs to
                            visualize your spending patterns.
                          </p>
                        </div>

                        <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                          <h1 className="text-[14px] md:text-[16px] font-semibold text-green-500">
                            2. Expense Tracking
                          </h1>
                          <p className="text-slate-400 md:text-[14px] text-[12px]">
                            - Easily add and categorize your expenses to keep a
                            record of your financial transactions.
                          </p>
                        </div>

                        <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                          <h1 className="text-[14px] md:text-[16px] font-semibold text-orange-500">
                            3. Daily Filter
                          </h1>
                          <p className="text-slate-400 md:text-[14px] text-[12px]">
                            - Monitor your expenses based on a date for a
                            comprehensive financial overview.
                          </p>
                        </div>

                        <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                          <h1 className="text-[14px] md:text-[16px] font-semibold text-yellow-500">
                            4. Visual Insights
                          </h1>
                          <p className="text-slate-400 md:text-[14px] text-[12px]">
                            - Gain valuable insights into your financial life
                            through intuitive data visualization.
                          </p>
                        </div>

                        <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                          <h1 className="text-[14px] md:text-[16px] font-semibold text-teal-500">
                            5. Payment Methods
                          </h1>
                          <p className="text-slate-400 md:text-[14px] text-[12px]">
                            - Monitor your expenses with different type of
                            payments used.
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                        <h1 className="text-[14px] md:text-[16px] font-semibold text-fuchsia-500">
                          6. Expense Control
                        </h1>
                        <p className="text-slate-400 md:text-[14px] text-[12px]">
                          - Take charge of your spending and improve your
                          financial well-being with our graphs.
                        </p>
                      </div>

                      <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                        <h1 className="text-[14px] md:text-[16px] font-semibold text-indigo-500">
                          7. Expense Trends
                        </h1>
                        <p className="text-slate-400 md:text-[14px] text-[12px]">
                          - Track monthly changes and activities in your
                          expenses over time with line charts.
                        </p>
                      </div>

                      <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                        <h1 className="text-[14px] md:text-[16px] font-semibold text-pink-500">
                          8. Category Breakdown
                        </h1>
                        <p className="text-slate-400 md:text-[14px] text-[12px]">
                          - Understand where your money goes with bar graphs.
                        </p>
                      </div>

                      <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                        <h1 className="text-[14px] md:text-[16px] font-semibold text-rose-500">
                          9. New User Registration
                        </h1>
                        <p className="text-slate-400 md:text-[14px] text-[12px]">
                          - Create your account and unlock the power of
                          financial data visualization.
                        </p>
                      </div>

                      <div className="bg-[#28272D] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)] p-3 space-y-2">
                        <h1 className="text-[14px] md:text-[16px] font-semibold text-red-500">
                          10. Existing User Login
                        </h1>
                        <p className="text-slate-400 md:text-[14px] text-[12px]">
                          - Each user has full control over data insertion and
                          deletion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
