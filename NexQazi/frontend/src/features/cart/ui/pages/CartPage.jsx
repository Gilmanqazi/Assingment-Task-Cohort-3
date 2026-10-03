import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../../hook/useCart"; // Apne hook path ke acc. verify karein

const CartPage = () => {
  // const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const { getCartHook, removeFromCartHook } = useCart();

 
  useEffect(() => {
    if (getCartHook) getCartHook();
  }, []);

  // Total price calculation
  const subtotal = cart?.reduce((acc, item) => {
    const itemPrice = item?.product?.price?.amount || item?.price || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs uppercase font-bold tracking-widest text-gray-500">
        Loading Cart Items...
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-wider text-black">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-gray-500">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold uppercase tracking-wider text-black mb-8 border-b pb-4">
        Shopping Cart ({cart.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => {
            const product = item.product;
            const itemPrice = product?.price?.amount || 0;

            return (
              <div
                key={item._id}
                className="flex gap-4 border-b pb-6 items-start justify-between"
              >
                {/* Product Image */}
                <div className="w-24 h-28 bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img
                    src={product?.images?.[0]?.url}
                    alt={product?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-bold uppercase text-black">
                    {product?.title}
                  </h3>
                  <p className="text-xs text-gray-500">Size: <span className="font-semibold text-black">{item.size}</span></p>
                  <p className="text-xs font-black text-black">₹{itemPrice}</p>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                  </div>
                </div>

                {/* Item Total & Remove */}
                <div className="text-right space-y-2">
                  <p className="text-sm font-bold text-black">
                    ₹{itemPrice * item.quantity}
                  </p>
                  <button
                    onClick={() =>removeFromCartHook(item._id)}
                    className="text-xs text-red-500 underline uppercase font-semibold hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-gray-50 p-6 h-max border space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-black border-b pb-3">
            Order Summary
          </h2>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Subtotal</span>
            <span className="font-bold text-black">₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Shipping</span>
            <span className="font-bold text-green-600">FREE</span>
          </div>

          <div className="border-t pt-3 flex justify-between text-sm font-black text-black">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;