import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../Services/apiRestaurant";
import Button from "../../UI/Button.jsx";
import { useSelector } from "react-redux";
import { clearCart, getCart, gettotalcartprice } from "../Cart/CartSlice.jsx";
import EmptyCart from "../Cart/EmptyCart.jsx";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers.js";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalcartprice = useSelector(gettotalcartprice);
  const priority = withPriority ? totalcartprice * 0.2 : 0;
  const totalprice = totalcartprice + priority;

  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector((state) => state.user.userName);
  if (!cart.length) return <EmptyCart />;
  return (
    <div className=" w-[95%] mx-auto max-w-3xl p-10  ">
      <h2 className="my-6 ">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center my-6 sm:gap-4 sm:my-6  ">
          <label className="sm:basis-40 ">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={username}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center my-6 sm:gap-4 sm:my-6  ">
          <label className="sm:basis-40 ">Phone number</label>
          <div className=" grow ">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="text-red-500 p-2 opacity-75 rounded-sm mt-0.5 text-sm">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center my-6 sm:gap-4 sm:my-6 ">
          <label className="sm:basis-40 ">Address</label>
          <div className=" grow">
            <input type="text" name="address" required className="input" />
          </div>
        </div>

        <div className="flex gap-3 items-center mb-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="bg-white h-6 w-6 accent-yellow-400 focus:outline-none border-none outline-none checked:ring focus:ring-yellow-400 focus:ring-offset-2 "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? `placing order... `
              : `order now for ${formatCurrency(totalprice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  console.log("lllllll");
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("hhhhhhhhh");
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "enter valid phone";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
