import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Searchinput() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  function handelSubmit(e) {
    e.preventDefault();
    if (!orderId) return;
    navigate(`order/${orderId}`);
    setOrderId("");
  }
  return (
    <form onSubmit={handelSubmit}>
      <input
        type="text"
        value={orderId}
        placeholder="Search order by ID"
        onChange={(e) => setOrderId(e.target.value)}
        className="bg-yellow-100 py-2 px-4 rounded-full w-60 sm:w-64 md:focus:w-70 text-sm placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:bg-yellow-200 focus:ring-opacity-50 transition-all duration-300"
      />
    </form>
  );
}
