import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { gettotalcartquantity, gettotalcartprice } from "./CartSlice";

function CartOverview() {
  const numofpizzas = useSelector(gettotalcartquantity);

  const totalPrice = useSelector(gettotalcartprice);
  console.log("nmof", numofpizzas);
  if (!numofpizzas) return null;

  console.log(totalPrice);
  return (
    <div className="bg-yellow-400 mb-auto text-stone-300 p-4 flex  text-sm md:text-base items-center justify-between   ">
      <p className="space-x-4 sm:space-x-6">
        <span className="  font-semibold text-red-800">
          {numofpizzas} pizzas
        </span>
        <span className="text-stone-700">${totalPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart" className="text-stone-700">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
