import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUser } from "../store/userSlice";

export const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const totalItems = useSelector((state: RootState) => state.cart.totalItem);
  console.log(user);
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        closeDrawer();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogOutUser = () => {
    dispatch(logoutUser());
    navigate("/sign-in");
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col 2xl:w-9/12 w-11/12 justify-center items-center">
        <div className="flex w-full items-center justify-center">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1, rotate: -360 }}
            transition={{
              type: "spring",
              duration: 1.5,
              damping: 8,
              stiffness: 100,
              ease: "easInOut",
            }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 mx-4 my-2 rounded-full"
          >
            <Link to={"/"}>
              <img
                src={"/online_logo.png"}
                className="w-16 h-16 object-contain"
                alt="logo"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.5,
              damping: 10,
              stiffness: 150,
            }}
            whileHover={{
              scale: [1, 1.1, 1],
              transition: { duration: 0.9, repeat: Infinity },
            }}
            className="flex mx-4"
          >
            <Link
              to={"/"}
              className="md:text-3xl text-2xl text-black font-sans font-extrabold tracking-normal"
            >
              Online Store
            </Link>
          </motion.div>
        </div>
        {/* Mobile Nav   */}
        <div className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-gradient-to-tr from-gray-100 to-gray-500">
          <button onClick={toggleDrawer} className="text-gray-900">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="xl" />
          </button>
          {user && (
            <div className="flex items-center">
              <span className="text-gray-900 text-lg font-sans font-semibold tracking-tighter capitalize">
                Welcome! {user?.username}
              </span>
            </div>
          )}
        </div>
        {isOpen && (
          <>
            <motion.div
              ref={drawerRef}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 w-64 h-full text-gray-900 bg-gray-50 z-50 px-2"
            >
              <div className="flex w-full items-center py-8 bg-slate-200">
                <Link to={"/"}>
                  <img
                    src={"/online_logo.png"}
                    className="w-14 h-14 rounded-xl object-contain"
                    alt="logo"
                  />
                </Link>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    duration: 1.5,
                    damping: 10,
                    stiffness: 150,
                  }}
                  whileHover={{
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.9, repeat: Infinity },
                  }}
                  className="flex mx-2"
                >
                  <Link
                    to={"/"}
                    className="text-2xl text-black font-sans font-extrabold tracking-normal"
                  >
                    Online Store
                  </Link>
                </motion.div>
              </div>
              <div className="flex w-full items-center justify-between py-4 border-b border-gray-400">
                {user ? (
                  <>
                    <div className="flex items-center">
                      <span className="text-gray-900 text-sm font-sans font-semibold tracking-normal capitalize">
                        Welcome! {user?.username}
                      </span>
                    </div>
                    <button
                      onClick={handleLogOutUser}
                      className="bg-red-600 text-white text-sm font-sans font-normal px-2 py-0.5 rounded-xl hover:bg-red-500"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={"/sign-in"}>
                      <span className="px-2 py-1 rounded-md text-sm text-gray-900 hover:text-gray-50 hover:bg-gray-900 font-sans font-semibold tracking-tight">
                        Sign In
                      </span>
                    </Link>
                    <Link to={"/sign-up"}>
                      <span className="px-2 py-1 rounded-md text-sm text-gray-900 hover:text-gray-50 hover:bg-gray-900 font-sans font-semibold tracking-tight">
                        Sign Up
                      </span>
                    </Link>
                  </>
                )}
              </div>
              <div className="flex flex-col space-y-2 py-2">
                <Link
                  className="p-2 md:text-lg sm:text-sm font-semibold font-sans text-black hover:text-white hover:bg-gray-900"
                  to={"/"}
                  onClick={toggleDrawer}
                >
                  Shop
                </Link>
                <Link
                  className="p-2 md:text-lg sm:text-sm font-semibold font-sans text-black hover:text-white hover:bg-gray-900"
                  to={"/cart"}
                  onClick={toggleDrawer}
                >
                  Cart
                </Link>
              </div>
            </motion.div>
            <div
              onClick={closeDrawer}
              className="fixed inset-0 bg-black opacity-50 z-40"
            ></div>
          </>
        )}
        {/* Full Nav */}
        <div className="hidden md:flex w-full items-center justify-between border xl:py-6 py-3 px-8 mx-0 sm:mx-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-500">
          <div className="flex items-center">
            <Link
              className="lg:text-lg text-sm font-semibold font-sans shadow-xl rounded-full hover:bg-gray-800 px-2 py-0.5 text-gray-900 hover:text-gray-50"
              to={"/"}
            >
              Shop
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <Link
                className="text-lg font-normal font-sans text-gray-900"
                to={"/cart"}
              >
                <FontAwesomeIcon
                  className="hover:scale-125 hover:text-sky-500 transition-all ease-linear transform duration-100 delay-100"
                  size="lg"
                  icon={faShoppingCart}
                ></FontAwesomeIcon>
              </Link>
              {totalItems > 0 && (
                <div className="absolute flex justify-center items-center -top-2 -left-2 w-5 h-5 rounded-full bg-red-600 text-center">
                  <p className="text-xs text-white font-sans font-semibold">
                    {totalItems}
                  </p>
                </div>
              )}
            </div>
            {user ? (
              <>
                <div className="flex flex-col items-center">
                  <span className="text-gray-900 lg:text-lg md:text-sm font-sans font-semibold tracking-normal capitalize">
                    Welcome! {user?.username}
                  </span>
                </div>
                <button
                  onClick={handleLogOutUser}
                  className="bg-red-600 text-white lg:text-sm md:text-xs font-sans font-semibold lg:p-2 md:p-1 rounded-xl hover:bg-red-500"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to={"/sign-in"}>
                  <span className="px-2 py-1 rounded-md text-sm text-gray-900 hover:text-gray-50 hover:bg-gray-900 font-sans font-semibold tracking-tight">
                    Sign In
                  </span>
                </Link>
                <Link to={"/sign-up"}>
                  <span className="px-2 py-1 rounded-md text-sm text-gray-900 hover:text-gray-50 hover:bg-gray-900 font-sans font-semibold tracking-tight">
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
