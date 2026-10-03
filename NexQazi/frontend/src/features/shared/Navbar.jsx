import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../features/auth/hook/useAuth.js";
import { toast } from "react-toastify";
import {
  User,
  ShoppingBag,
  LogOut,
  PlusSquare,
  PackageCheck,
  Menu,
  X,
  Store,
} from "lucide-react";
import { useCart } from "../cart/hook/useCart.js";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cart = [] } = useSelector((state) => state.cart || { cart: [] });
  const { logout } = useAuth();
  const { getCart } = useCart();

  useEffect(() => {
    if (user && getCart) {
      getCart();
    }
  }, [user]);

  const handleLogout = async () => {
    const userName = user?.name || "user";
    try {
      await logout().unwrap();
      setIsMobileMenuOpen(false);
      toast.warn(`Logout User ${userName}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const totalCartCount = cart?.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const isSeller = user?.role === "seller";

  return (
    <header className="w-full font-sans border-b border-gray-200 sticky top-0 z-50 bg-white">
     
      <div className="bg-black text-white text-[10px] sm:text-[11px] font-medium tracking-wider px-4 sm:px-6 py-2 flex justify-between items-center uppercase">
        <div className="truncate">Free Delivery on orders above ₹999</div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="#" className="hover:underline">Download App</Link>
          <span>|</span>
          <Link to="#" className="hover:underline">Track Order</Link>
          <span>|</span>
          <Link to="#" className="hover:underline">Help</Link>
        </div>
      </div>

     
      <nav className="px-4 sm:px-8 py-4 flex items-center justify-between bg-[#EFEFEF] text-black">
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          
          <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold tracking-widest uppercase">
            <Link to="/home/products" className="hover:opacity-60 transition-opacity">
              Shop All
            </Link>
            <Link to="/home/products" className="hover:opacity-60 transition-opacity">
              New Arrivals
            </Link>

            
            {isSeller && (
              <div className="flex items-center space-x-5 pl-4 border-l border-gray-300">
                <Link
                  to="/home/seller/products"
                  className="flex items-center space-x-1.5 text-black font-bold hover:opacity-75 transition-opacity"
                  title="View & Manage Your Catalog"
                >
                  <PackageCheck className="w-4 h-4 text-black" />
                  <span>My Products</span>
                </Link>

                <Link
                  to="/home/create/products"
                  className="flex items-center space-x-1.5 bg-black text-white px-3 py-1.5 rounded-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  <PlusSquare className="w-3.5 h-3.5" />
                  <span>Create Product</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        
        <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter uppercase font-serif">
          <Link to="/home">NEXTQAZI</Link>
        </div>

        
        <div className="flex items-center space-x-3 sm:space-x-6 text-xs font-semibold tracking-wider uppercase">
          {user ? (
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="lowercase font-normal text-gray-700 truncate max-w-[120px]">
                  Hi, {user.name}
                </span>
                {isSeller && (
                  <span className="bg-black text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm tracking-widest flex items-center gap-1">
                    <Store className="w-2.5 h-2.5" /> SELLER
                  </span>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-red-600 transition-colors ml-2"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="hidden sm:flex items-center space-x-1.5 hover:opacity-60 transition-opacity"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

         
          <Link
            to="/home/cart"
            className="flex items-center space-x-1.5 hover:opacity-60 transition-opacity relative bg-white px-3 py-1.5 border border-gray-200 rounded-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-bold text-xs">({totalCartCount})</span>
          </Link>
        </div>
      </nav>

      
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#EFEFEF] border-b border-gray-300 px-6 py-6 space-y-5 animate-fadeIn">
          {user ? (
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
              <div className="flex items-center space-x-2">
                <span className="lowercase font-medium text-gray-800">
                  Hi, {user.name}
                </span>
                {isSeller && (
                  <span className="bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                    SELLER
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 font-bold text-xs uppercase"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-xs font-bold uppercase pb-4 border-b border-gray-300"
            >
              <User className="w-4 h-4" />
              <span>Login / Register</span>
            </Link>
          )}

          <div className="flex flex-col space-y-4 text-xs font-bold tracking-widest uppercase">
            <Link
              to="/home/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              Shop All
            </Link>
            <Link
              to="/home/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              New Arrivals
            </Link>

           
            {isSeller && (
              <div className="pt-3 border-t border-gray-300 space-y-3">
                <span className="text-[10px] font-black text-gray-500 tracking-wider">
                  SELLER DASHBOARD
                </span>
                <Link
                  to="/home/seller/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-black font-bold"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>My Products Catalog</span>
                </Link>
                <Link
                  to="/home/create/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-black font-bold"
                >
                  <PlusSquare className="w-4 h-4" />
                  <span>Create New Product</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;