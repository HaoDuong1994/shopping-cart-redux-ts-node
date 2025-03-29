import { RootState } from "../store/store";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { IProduct } from "../slices/productSlice";
import { addCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
  const productState = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  //Fetch API product
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if (productState.loading) return <div>Loading...</div>;
  if (productState.error) return <div>Loading product fail</div>;
  const handleAddCart = (item: IProduct) => {
    console.log(item);
    let itemCart = { ...item, quantity: 1 };
    dispatch(addCart(itemCart));
  };
  const navigateCart = (): void => {
    navigate("/cart");
  };
  return (
    <div className="mx-2">
      <div className="flex justify-center">
        <div className="w-24 h-10 bg-blue-500 text-white font-semibold rounded-s-lg flex items-center justify-center hover:bg-blue-400 transition cursor-pointer">
          Home
        </div>
        <div
          onClick={() => {
            navigateCart();
          }}
          className="w-24 h-10 bg-blue-500 text-white font-semibold border-l-1 border-r-1 border-black flex items-center justify-center hover:bg-blue-400 transition cursor-pointer">
          Cart
        </div>
        <div className="w-24 h-10 bg-blue-500 text-white font-semibold rounded-r-lg flex items-center justify-center hover:bg-blue-400 transition cursor-pointer">
          Order
        </div>
      </div>
      <h4 className="text-3xl text-center mt-4">Customer Purchase</h4>
      <div className="grid grid-cols-3 gap-6">
        {productState.products.map((product) => (
          <div
            key={product.productCode}
            className="border-1 border-gray-300 shadow-md shadow-gray-500 p-4">
            <img
              className="w-full h-40 object-cover rounded-md"
              src={product.img}
              alt={product.productName}
            />
            <h2 className="text-lg font-bold mt-2">{product.productName}</h2>
            <p className="text-gray-600">{product.productCode}</p>
            <p className="text-red-500 font-semibold">${product.buyPrice}</p>
            <p className="text-sm text-gray-500">{product.productType}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => handleAddCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductList;
