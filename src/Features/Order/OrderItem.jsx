import { formatCurrency } from "../../Utils/helpers.js";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="pt-4 pb-2">
      <div className="flex justify-between items-center gap-4 text-sm">
        <div>
          <span className="font-bold">{quantity}&times;</span> {name}
          {isLoadingIngredients ? (
            <p className="text-stone-500 text-sm mt-1">loading... </p>
          ) : (
            <p className="text-xs italic mt-1 sm:text-sm capitalize text-stone-500">
              {ingredients.join(" , ")}{" "}
            </p>
          )}
        </div>

        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
