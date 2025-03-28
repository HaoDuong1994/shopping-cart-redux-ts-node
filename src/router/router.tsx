import CartList from "../redux/component/cart";
import ProductList from "../redux/component/productList";
import { Routes, Route } from "react-router-dom";
function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/cart" element={<CartList />} />
    </Routes>
  );
}
export default AppRoute;
