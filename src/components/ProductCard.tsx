import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductDetails } from "../store/productSlice";
import { AppDispatch } from "../store/store";
import { ProductCardProps } from "../types";
import axios from "axios";
import { addItemToCart } from "../store/cartSlice";

export const ProductCard = ({
  _id,
  productName,
  imageUrl,
  description,
  stockQuantity,
  price,
}: ProductCardProps) => {
  const [mainImage, setMainImage] = useState(imageUrl.main);
  const [likes, setLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/v1/products/product/${_id}`
      );
      setLikesCount(response.data.product.likes);
      setLikes(response.data.product.likes > 0);
    };
    fetchLikes();
  }, [_id]);

  const toggleLikes = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/products/product/${_id}/like`
      );
      setLikes(!likes);
      setLikesCount(response.data.likes);
    } catch (error) {
      console.log("Error occurred while liking product:", error);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        _id,
        title: productName,
        imageUrl: mainImage,
        price,
        stockQuantity,
      })
    );
  };

  const handleNavigate = () => {
    dispatch(
      setProductDetails({
        _id,
        productName,
        imageUrl,
        description,
        stockQuantity,
        price,
      })
    );
    navigate(`/product/${_id}`);
  };

  return (
    <div className="flex flex-col w-80 h-auto my-2 items-center justify-center rounded-2xl shadow-xl bg-gradient-to-t from-slate-200 to-gray-50">
      <div className="flex w-full items-center justify-center p-4 relative">
        <div className="absolute top-6 right-14">
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: [1.25] }}
            transition={{ duration: 0.3, damping: 10, stiffness: 50 }}
            exit={{ scale: 1 }}
            onClick={toggleLikes}
            className="text-3xl text-gray-600 font-sans font-bold absolute"
          >
            {!likes ? (
              <span className="text-gray-400 font-sans font-semibold text-3xl">
                &#x2661;
              </span>
            ) : (
              <span className="text-red-400 font-sans font-semibold text-3xl">
                &#x2665;
              </span>
            )}
          </motion.button>
        </div>
        <img
          src={`${mainImage}`}
          alt={`${productName}`}
          onClick={handleNavigate}
          className="w-80 h-80 lg:w-72 lg:h-72 object-center rounded-xl shadow-md hover:cursor-pointer hover:shadow-xl"
        />
      </div>
      <div className="flex w-full p-4">
        {imageUrl.sub_images.map((subImgs, index) => (
          <img
            key={index}
            src={subImgs}
            alt={`${productName}`}
            onClick={() => setMainImage(subImgs)}
            className="w-14 h-14 object-center m-1 rounded-sm border border-gray-500 hover:opacity-80 cursor-pointer"
          />
        ))}
      </div>
      <div className="flex flex-col h-full items-start p-4 shadow-2xl rounded-2xl shadow-gray-300">
        <div className="flex w-full items-center justify-between">
          <h5 className="text-gray-900 text-xl font-semibold font-sans tracking-wider">
            {productName}
          </h5>
          <p className="text-gray-900 font-sans font-normal text-xs">
            Likes {likesCount}
          </p>
        </div>
        <div className="flex w-full items-center justify-center h-full">
          <p className="text-gray-900 text-sm font-normal font-sans tracking-wider my-2">
            <span className="text-gray-900 text-sm font-semibold font-sans tracking-wider">
              Description:
            </span>{" "}
            {description}
          </p>
        </div>
        <span className="text-gray-900 text-lg font-normal font-mono mt-2">
          Stock: {stockQuantity}
        </span>

        <div className="flex w-full items-center justify-between">
          <div className="my-1">
            <span className="text-gray-900 text-lg font-semibold font-mono mt-2">
              $ {price}
            </span>
          </div>
          <div className="my-1">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.68, -0.55, 0.27, 1.55],
              }}
              whileHover={{
                scale: 1.1,
                transition: {
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
              onClick={handleAddToCart}
              className="px-3 py-2 rounded-xl bg-black text-xs text-gray-50 font-sans font-semibold"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
