import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
} from "../slices/cartSlice";
function CartList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cartItem } = useSelector((state: RootState) => state.cart);
  const handleDelete = (id: number | string): void => {
    dispatch(deleteItem(id));
  };
  return (
    <div className="text-red-600">
      <div className="p-4">
        <div className="flex">
          <h2 className="text-xl font-semibold">Cart Item</h2>
          <span>
            <HomeIcon
              onClick={() => {
                navigate("/");
              }}
              className="ml-4 w-6 h-6 text-black hover:cursor-pointer"
            />
          </span>
        </div>
        {cartItem.length === 0 ? (
          <p>Cart Empty...</p>
        ) : (
          cartItem.map((item) => (
            <div
              key={item._id}
              className="mt-4 border p-4 rounded-lg shadow-md flex mb-4">
              <img
                src={item.img}
                alt={item.productName}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="font-bold text-red-500">
                  {item.buyPrice.toLocaleString()} VNĐ
                </p>
                <p className="w-25 flex justify-center items-center text-center border-solid border-gray-300 rounded-lg overflow-hidden text-gray-500 border border-solid">
                  <span
                    className="[flex-basis:20%] flex items-center justify-center bg-gray-200 border-r border-gray-300 hover:cursor-pointer"
                    onClick={() => {
                      dispatch(increaseQuantity(item._id));
                    }}>
                    +
                  </span>
                  <span className="flex-grow">{item.quantity}</span>
                  <span
                    className="[flex-basis:20%] flex items-center justify-center bg-gray-200 border-l border-gray-300 hover:cursor-pointer"
                    onClick={() => {
                      dispatch(decreaseQuantity(item._id));
                    }}>
                    -
                  </span>
                </p>
              </div>
              <button
                onClick={() => {
                  handleDelete(item._id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out flex items-center justify-center text-sm">
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default CartList;
