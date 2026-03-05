import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../features/cart/cartThunk";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };

  const handleRemoveFromCart = ({ productId, size, color }) => {
    dispatch(removeFromCart(productId, guestId, userId, size, color));
  };

  return (
    <div>
      {cart.products.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-start py-4 border-b border-gray-300"
        >
          <div className="flex items-start">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{item.name}</h3>
              <p className="text-sm text-gray-500">
                size : {item.size} | color : {item.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      item.productId,
                      -1,
                      item.quantity,
                      item.size,
                      item.color,
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      item.productId,
                      1,
                      item.quantity,
                      item.size,
                      item.color,
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {item.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(item.productId, item.size, item.color)
              }
            >
              <RiDeleteBin3Line className="size-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
