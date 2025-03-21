import { RootState } from "../store/store";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
function ProductList() {
  const productState = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(productState);
  if (productState.loading) return <div>Loading...</div>;
  if (productState.error) return <div>Loading product fail</div>;
  return (
    <div>
      {productState.products.map((product) => {
        return (
          <div className="border rounded-lg shadow-md p-4 w-64">
            <img
              src={product.img}
              alt={product.productName}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mt-2">{product.productName}</h2>
            <p className="text-sm text-gray-500">{product.productCode}</p>
            <p className="text-lg font-semibold text-red-500">
              ${product.buyPrice}
            </p>
            <p className="text-xs text-gray-400">{product.productType}</p>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default ProductList;
