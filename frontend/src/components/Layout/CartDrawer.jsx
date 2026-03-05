import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartContent from "../Cart/CartContent";

const CartDrawer = ({ drawerOpen, toggleDrawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleNavigateToCheckout = () => {
    setDrawerOpen(false);
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate(`/checkout`);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[80%] sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleDrawerOpen}>
          <IoMdClose className="size-6 text-gray-600" />
        </button>
      </div>
      {/* Cart Components */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-xl mb-4 font-semibold">Your Cart</h2>
        {/* Componene for cart content */}
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Checkout button - fixed at bottom */}
      <div className="sticky p-4 bottom-0 bg-white">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleNavigateToCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Shipping, taxes, and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
