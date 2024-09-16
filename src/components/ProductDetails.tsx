import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../store/productSlice";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const [mainImage, setMainImage] = useState(product?.imageUrl.main);

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(fetchProductById(id!));
    }
  }, [dispatch, id, product]);

  useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl.main);
    }
  }, [product]);

  if (!product) {
    return (
      <>
        <div className="flex w-full items-center justify-center py-8">
          <span className="text-2xl text-gray-900 font-sans font-semibold tracking-wider">
            Loading...
          </span>
        </div>
      </>
    );
  }

  return (
    <div className="flex w-full items-center justify-center my-8">
      <div className="flex 2xl:w-1/2 w-4/5 p-4 items-center rounded-xl shadow-lg shadow-gray-300">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col items-center justify-center">
            <img
              src={mainImage}
              alt={product?.productName}
              className="md:w-152 w-128 h-96 object-cover rounded-xl shadow-md shadow-gray-300"
            />
            <div className="flex w-full p-4 items-center justify-center">
              {product?.imageUrl.sub_images?.map(
                (sub_img: string, subIndex: number) => (
                  <img
                    key={subIndex}
                    src={`${sub_img}`}
                    alt={`${subIndex}`}
                    onClick={() => setMainImage(sub_img)}
                    className="w-20 h-20 object-center m-1 rounded-sm border border-gray-500 hover:opacity-80 cursor-pointer"
                  />
                )
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-gray-900 font-semibold text-2xl font-sans">
              {product?.productName}
            </h1>
            <p className="text-gray-900 font-normal text-sm font-sans py-2">
              <span className="text-gray-900 font-semibold text-lg font-sans">
                Description:
              </span>{" "}
              {product?.description}
            </p>
            <span className="text-gray-900 font-semibold text-md font-sans py-2">
              Stock Quantity: {product?.stockQuantity}
            </span>
            <span className="text-gray-900 font-semibold text-md font-sans">
              Price: {product?.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
