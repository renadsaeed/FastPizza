import { Link } from "react-router-dom";
import Button from "../../UI/Button.jsx";
import LinkButton from "../../UI/LinkButton.jsx";
import CartItem from "./CartItem.jsx";
import { useSelector } from "react-redux";
import { clearCart } from "./CartSlice.jsx";
import { getCart } from "./CartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart.jsx";
import { clear } from "./CartSlice.jsx";
function Cart() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userName);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="py-6 px-4">
      <LinkButton to="/menu"> &larr; Back to menu </LinkButton>

      <h2 className="my-4 font-semibold">Your cart, {username}</h2>
      <ul className="divide-y divide-stone-200 border-b border-stone-200 my-5 ">
        {cart.map((item) => (
          <CartItem item={item} key={item.key} />
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <Button to="/order/new" type="primary">
          {" "}
          Order pizzas{" "}
        </Button>

        <Button type="secondary" onClick={() => clear(dispatch)}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
