import { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setProducts } from "../store/productSlice";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/products/get-all-products"
        );
        dispatch(setProducts(response.data.products));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full items-center justify-center bg-gradient-to-b from-sky-100 to-gray-100 py-8 scroll-smooth">
      <div className="flex items-center justify-center">
        <div className="max-w-4xl text-center py-8">
          <h1 className="text-3xl text-gray-900 font-extrabold font-sans tracking-wider uppercase">
            Featured Items
          </h1>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 justify-items-center">
        {products?.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};
