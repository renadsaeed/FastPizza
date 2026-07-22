import { formatCurrency } from "../../Utils/helpers.js";
import Button from "../../UI/Button.jsx";
import { getquantitybyid } from "../Cart/CartSlice.jsx";
import DeleteItem from "../../UI/DeleteItem.jsx";
import { addItem } from "../Cart/CartSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import UpdateItemQuantity from "../Cart/UpdateItemQuantity.jsx";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const quantity = useSelector((state) => getquantitybyid(state, id));
  console.log("quantity", quantity);
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };
    dispatch(addItem(newItem));
  }
  console.log("pizza", quantity);
  return (
    <li className="flex gap-4 text-sm   ">
      <img
        src={imageUrl}
        alt={name}
        className={`w-26 ${soldOut ? `opacity-70 grayscale` : ``}`}
      />
      <div className=" flex flex-col text-xs gap-1  grow capitalize sm:text-sm ">
        <p className="text-sm pt-2 font-medium sm:text-base">{name}</p>
        <p className="text-stone-500 italic ">{ingredients.join(", ")}</p>
        <div className="mt-auto text-sm flex flex-col gap-2 sm:flex-row sm:items-center pt-1  justify-between items-start ">
          {!soldOut ? (
            <>
              <p className="">{formatCurrency(unitPrice)}</p>
              {quantity > 0 ? (
                <div className="flex gap-2 items-center">
                  <DeleteItem id={id} />
                  <UpdateItemQuantity id={id}>{quantity}</UpdateItemQuantity>
                </div>
              ) : (
                <Button type="small" onClick={handleAddToCart}>
                  Add To Cart
                </Button>
              )}
            </>
          ) : (
            <p className="uppercase text-stone-500 font-medium">Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
