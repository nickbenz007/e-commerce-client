import {
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
} from "../store/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

export const CartItems = () => {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.stockQuantity,
      0
    )
  );
  const dispatch: AppDispatch = useDispatch();

  const handleRemoveCart = (_id: string) => {
    dispatch(removeItemFromCart(_id));
  };

  const handleIncrement = (_id: string) => {
    dispatch(incrementQuantity(_id));
  };

  const handleDecrement = (_id: string) => {
    dispatch(decrementQuantity(_id));
  };
  return (
    <div className="flex flex-col items-center">
      {cartItem.length === 0 ? (
        <h1 className="text-gray-900 text-xl font-sans font-semibold tracking-wider py-8">
          Your cart is empty
        </h1>
      ) : (
        cartItem.map((item) => (
          <div
            key={item._id}
            className="flex w-full items-center justify-center my-8"
          >
            <div className="flex 2xl:w-1/2 w-4/5 p-4 items-center rounded-xl shadow-lg shadow-gray-300">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="md:w-152 w-96 h-60 object-cover rounded-xl shadow-md shadow-gray-300"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-gray-900 font-semibold text-2xl font-sans">
                    Item: {item.title}
                  </h1>
                  <span className="text-gray-900 font-semibold text-md font-sans">
                    Price: {item.price}
                  </span>
                  <div className="flex items-center justify-between md:my-8 my-4">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1 rounded-lg bg-gray-100 shadow-sm shadow-gray-200 text-gray-900 text-xl font-sans font-semibold"
                    >
                      -
                    </button>
                    <input
                      className="md:w-60 w-40 px-3 py-1 rounded-lg bg-gray-100 shadow-sm shadow-gray-200 text-gray-900 text-xl text-center font-sans font-semibold"
                      type="number"
                      value={item.stockQuantity}
                      readOnly
                    />
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-3 py-1 rounded-lg bg-gray-100 shadow-sm shadow-gray-200 text-gray-900 text-xl font-sans font-semibold"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-gray-900 font-semibold text-md font-sans py-2">
                      Total: ${(item.price * item.stockQuantity).toFixed(2)}
                    </span>
                    <motion.button
                      initial={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        duration: 0.5,
                        damping: 9,
                        stiffness: 100,
                      }}
                      whileTap={{ scale: 1.02 }}
                      className="px-2 py-1 rounded-lg bg-red-600 shadow-sm shadow-indigo-500 text-gray-100 text-xs font-sans font-semibold"
                      onClick={() => handleRemoveCart(item._id)}
                    >
                      Remove Item
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {cartTotal && (
        <div className="flex items-center justify-center my-8 px-3 py-2 shadow-lg rounded-xl shadow-green-500">
          <span className="text-green-600 text-xl font-sans font-bold tracking-wider">
            Total: $ {cartTotal && cartTotal.toFixed(2)}{" "}
          </span>
        </div>
      )}
    </div>
  );
};
