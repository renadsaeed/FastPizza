import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { increaseItem, decreseItem } from "./CartSlice.jsx";

export default function UpdateItemQuantity({ id, children }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 justify-center items-center">
      <Button type="round" onClick={() => dispatch(decreseItem(id))}>
        -
      </Button>
      <p className="font-semibold center mb-3">{children}</p>
      <Button type="round" onClick={() => dispatch(increaseItem(id))}>
        +
      </Button>
    </div>
  );
}
