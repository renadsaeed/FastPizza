import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Searchinput from "../Features/Order/Searchinput";
export default function Header() {
  const { userName } = useSelector((state) => state.user);
  return (
    <header className="bg-yellow-400 uppercase px-4 py-3 flex flex-col sm:flex-row  items-center justify-around">
      <Link to="/" className="tracking-widest my-3 sm:y-0">
        Fast React Pizza Co.{" "}
      </Link>
      <Searchinput />
      <p className="hidden md:block"> {userName}</p>
    </header>
  );
}
