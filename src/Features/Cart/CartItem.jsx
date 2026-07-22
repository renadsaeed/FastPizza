import Button from "../../UI/Button.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { deleteitem } from "./CartSlice.jsx";
import { useDispatch } from "react-redux";
import DeleteItem from "../../UI/DeleteItem.jsx";
import UpdateItemQuantity from "./UpdateItemQuantity.jsx";
function CartItem({ item }) {
  console.log("item", item);
  const { pizzaId, name, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  return (
    <li className="pt-4 pb-2 sm:flex sm:justify-between sm:items-center ">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between  items-center sm:space-x-4 mt-5 ">
        <p className="font-bold ">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-2 items-center py-1">
          {quantity >= 1 && <DeleteItem id={pizzaId} />}
          <UpdateItemQuantity id={pizzaId}>{quantity}</UpdateItemQuantity>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
