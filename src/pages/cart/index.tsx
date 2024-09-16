import React from "react";
import { CartItems } from "../../components/CartItems";

export const Cart = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <CartItems />
    </div>
  );
};
