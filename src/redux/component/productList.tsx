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
  const cartState = useSelector((state: RootState) => state.cart);
  console.log(cartState.cartItem);
  const dispatch = useDispatch<AppDispatch>();
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
    <div className="grid grid-cols-3 gap-4 p-4">
      <button
        onClick={() => {
          navigateCart();
        }}>
        Card
      </button>
      {productState.products.map((product) => (
        <div
          key={product.productCode}
          className="border p-4 shadow-md rounded-lg">
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
  );
}
export default ProductList;
