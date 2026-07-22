import Button from "./Button.jsx";
import { deleteitem } from "../Features/Cart/CartSlice.jsx";
import { useDispatch } from "react-redux";
export default function DeleteItem({ id }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => deleteitem(dispatch, id)}>
      Delete
    </Button>
  );
}
