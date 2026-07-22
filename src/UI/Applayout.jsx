import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader.jsx";
import CartOverview from "../Features/Cart/CartOverview";
export default function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-[100dvh] grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      <main className="overflow-y-auto bg-stone-200">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
