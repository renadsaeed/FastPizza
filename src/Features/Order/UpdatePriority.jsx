import { useFetcher } from "react-router-dom";
import Button from "../../UI/Button";
import { updateOrder } from "../../Services/apiRestaurant";

export default function UpdatePriority() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">Make it priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}
