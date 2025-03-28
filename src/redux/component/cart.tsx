import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteItem } from "../slices/cartSlice";
function CartList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cartItem } = useSelector((state: RootState) => state.cart);
  const handleDelete = (id: number | string): void => {
    dispatch(deleteItem(id));
  };
  return (
    <div className="text-red-600">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => {
          navigate("/");
        }}>
        Home
      </button>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Giỏ Hàng</h2>
        {cartItem.length === 0 ? (
          <p>Cart Empty</p>
        ) : (
          cartItem.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-md flex mb-4">
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
                <p>Số lượng: {item.quantity}</p>
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
