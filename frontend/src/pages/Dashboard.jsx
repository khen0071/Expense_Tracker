import ExpenseList from "../components/ExpenseList";
import { motion } from "framer-motion";

const dashboardVariant = {
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

const Dashboard = () => {
  return (
    <>
      <div>
        <div className="dashboardContainer">
          <motion.div
            variants={dashboardVariant}
            initial="initial"
            animate="animate"
            className=" p-6 max-w-[1600px] mx-auto">
            <ExpenseList />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
