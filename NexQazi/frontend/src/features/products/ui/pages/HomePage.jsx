import { Link } from "react-router-dom";
import Navbar from "../../../../features/shared/Navbar";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import ProductPage from "./ProductPage";

const HomePage = () => {
  return (
    <div className="w-full bg-[#EFEFEF] min-h-screen text-black font-sans overflow-x-hidden">
      <Navbar />

   
      <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] bg-[#D6D6D6] overflow-hidden flex items-center justify-center">
      
        <div className="absolute inset-0 z-0 flex justify-center items-center overflow-hidden">
          <img
            src="https://d2d5n4ft74bagm.cloudfront.net/media/banners/20d1bc54-5e52-411c-b3af-0b4fbef3aeeb/1789450936_desktop.jpeg"
            alt="Hero Model"
            className="w-full h-full object-cover object-center sm:object-top opacity-100 contrast-105"
          />
        </div>

       
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-2">
          <h1 className="text-[16vw] sm:text-[18vw] font-black tracking-tighter text-black/10 select-none uppercase font-serif text-center leading-none">
            NEXQAZI
          </h1>
        </div>

       
        <div className="absolute right-3 sm:right-8 md:right-16 bottom-4 sm:bottom-16 z-20 text-right bg-white/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-2 sm:p-0 rounded">
          <p className="text-[9px] sm:text-xs font-semibold tracking-widest uppercase text-gray-900 leading-tight">
            New
            <br />
            Collection
            <br />
            2026
          </p>
        </div>
      </section>

    
      <section className="relative w-full min-h-[45vh] sm:h-[65vh] bg-[#C8C8C8] flex flex-col md:flex-row items-center justify-between p-6 sm:px-12 md:px-20 overflow-hidden">
        <div className="z-10 w-full md:max-w-md space-y-3 sm:space-y-4 py-6 md:py-0 text-left">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-700">
            New Season
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-tight text-black">
            New
            <br />
            Vibes
          </h2>
          <p className="text-xs text-gray-700 tracking-wider">
            Discover everything new and now.
          </p>
          <div className="pt-2">
            <Link
              to="/home/products"
              className="bg-black text-white text-xs font-semibold uppercase px-5 py-3 tracking-widest hover:bg-gray-800 transition-colors inline-block w-full sm:w-auto text-center"
            >
              Explore Collection
            </Link>
          </div>
        </div>

       
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
            alt="New Vibes Model"
            className="h-full w-full object-cover object-top transition-all duration-500"
          />
        </div>
      </section>

      <section className="py-6 sm:py-10 border-y border-gray-300 bg-[#EFEFEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 justify-center md:justify-start">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-black" />
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Fast Delivery</h4>
              <p className="text-[9px] sm:text-[11px] text-gray-600">Quick & safe delivery</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 justify-center md:justify-start">
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-black" />
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Easy Returns</h4>
              <p className="text-[9px] sm:text-[11px] text-gray-600">Within 15 days</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 justify-center md:justify-start">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-black" />
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Quality Assured</h4>
              <p className="text-[9px] sm:text-[11px] text-gray-600">Best fashion & quality</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 justify-center md:justify-start">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-black" />
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Secure Payment</h4>
              <p className="text-[9px] sm:text-[11px] text-gray-600">100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-4">
        <ProductPage />
      </section>
    </div>
  );
};

export default HomePage;