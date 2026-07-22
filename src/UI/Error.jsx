import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./Linkbutton.jsx";
function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
     
      <LinkButton to="0" >&larr; Go back </LinkButton>
    </div>
  );
}

export default Error;
