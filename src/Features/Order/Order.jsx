// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../Services/apiRestaurant";
import OrderItem from "./OrderItem.jsx";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../Utils/helpers.js";
// import store from "../../Store.jsx";
import { useEffect } from "react";
import UpdatePriority from "./UpdatePriority.jsx";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  return (
    <div className="px-4 py-6 space-y-8 md:text-medium ">
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <h2 className=" font-bold"> Order #{id} Status</h2>

        <div className="flex gap-4 items-center">
          {priority && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full tracking-wide text-sm font-semibold">
              Priority
            </span>
          )}
          <span className="bg-green-500 text-white px-3 py-1 rounded-full tracking-wide text-sm font-semibold">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4 bg-stone-100 p-4 text-sm  md:text-medium rounded-lg">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-y divide-stone-300 border-b border-stone-300 my-5 ">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.id}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>
      <div className="flex justify-between items-center flex-wrap gap-4 bg-stone-100 p-4 text-sm  md:text-medium rounded-lg font-medium">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className=" font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdatePriority />}
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  console.log("pr", params);

  return order;
}

export default Order;
