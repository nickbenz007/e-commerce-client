import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Nav";
import { Cart } from "./pages/cart";
import { Shop } from "./pages/shop";
import { ProductDetails } from "./components/ProductDetails";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
