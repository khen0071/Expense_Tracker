import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddExpenseMutation } from "../features/api/expense/expenseSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const AddExpense = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    paidWith: "cash",
    paymentDetail: "",
    category: "personal",
    date: startDate.toString(),
  });

  const { title, price, paidWith, paymentDetail, category, date } = formData;

  const [addExpense] = useAddExpenseMutation();

  const submitHandler = (e) => {
    e.preventDefault();
    addExpense({
      title,
      price: Number(price),
      paidWith,
      paymentDetail,
      category,
      date: startDate.toString(),
    });
    setFormData({
      title: "",
      price: 0,
      paidWith: "cash",
      paymentDetail: "",
      category: "personal",
      date: new Date(),
    });
    setLoading(false);
    toast.success("New Expense Added");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const calFilter = (date) => new Date() <= date;

  const disabled = !title || price == "0" || loading;

  return (
    <>
      <motion.div className="">
        <AnimatePresence>
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center items-center md:flex-row flex-wrap lg:space-x-3 bg-[#28272D] p-6 mb-6 border  border-[#323232] rounded-md shadow-[0_3px_10px_rgb(0,0,0,1)]">
            <div className="space-y-1 flex flex-col items-center lg:items-start pb-3 lg:w-auto w-full">
              <label className="text-[12px] text-gray-500 font-[400]">
                Category:{" "}
              </label>
              <select
                value={category}
                onChange={onChange}
                id="category"
                className="select select-info w-full">
                <option value="personal">Personal</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="housing">Housing</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div className="space-y-1 flex flex-col items-center lg:items-start pb-3 lg:w-auto w-full">
              <label className="text-[12px] text-gray-500 font-[400]">
                Expense:{" "}
              </label>
              <input
                value={title}
                id="title"
                onChange={onChange}
                type="text"
                placeholder="Ex: Grocery"
                required
                className="input input-bordered input-info w-full"
              />
            </div>

            <div className="space-y-1 flex flex-col items-center lg:items-start pb-3 lg:w-[120px] w-full">
              <label className="text-[12px] text-gray-500 font-[400]">
                Price:{" "}
              </label>
              <input
                value={price}
                id="price"
                onChange={onChange}
                type="number"
                required
                min={0}
                className="input input-bordered input-info w-full"
              />
            </div>

            <div className="space-y-1 flex flex-col items-center lg:items-start pb-3 lg:w-auto w-full">
              <label className="text-[12px] text-gray-500 font-[400]">
                Paid With:{" "}
              </label>
              <select
                value={paidWith}
                id="paidWith"
                onChange={onChange}
                className="select select-info w-full">
                <option value="cash">Cash</option>
                <option value="debit">Debit Card</option>
                <option value="credit">Credit Card</option>
              </select>
            </div>

            <div className="space-y-1 flex flex-col items-center lg:items-start pb-3 lg:w-auto w-full">
              <label className="text-[12px] text-gray-500 font-[400]">
                Payment Detail (Optional):{" "}
              </label>
              <input
                value={paymentDetail}
                id="paymentDetail"
                onChange={onChange}
                type="text"
                placeholder="Ex: Receipt #"
                className="input input-bordered input-info w-full"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-3 mt-3 lg:w-auto w-full">
              <DatePicker
                // filterDate={calFilter}
                value={startDate}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"
                withPortal
                className="p-3  text-center w-full btn btn-outline btn-success"
              />

              <br />
              <button
                disabled={disabled}
                className="btn btn-outline btn-info md:w-auto w-full">
                Add Expense
              </button>
            </div>
          </form>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AddExpense;
