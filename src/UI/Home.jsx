import CreateUser from "../Features/Users/CreateUser.jsx";
import { useSelector } from "react-redux";
import Button from "./Button.jsx";
function Home() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="my-10 text-center  text-sm sm:text-xl sm:my-16 px-4 ">
      <h1 className=" mb-8  font-semibold md:text-3xl  ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          continue ordering
        </Button>
      )}
    </div>
  );
}

export default Home;
