import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../../api/hook/useProducts";
import { ArrowLeft, PackageX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { fetchProducts, products, loading, error } = useProduct();

  useEffect(() => {
    if (fetchProducts) fetchProducts();
  }, []);

  const navigate = useNavigate()

  const validProducts =
    products?.filter((p) => p && p.title) || [];

  return (
    <div className="w-full bg-white min-h-screen"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
        <div className="border-b pb-6 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black font-serif">
            All Collections
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
            Explore premium apparel & minimal drops
          </p>
        </div>

    
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-100 animate-pulse rounded-none aspect-[3/4] flex flex-col justify-end p-4"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

      
        {!loading && error && (
          <div className="py-20 text-center border border-red-200 bg-red-50/50 rounded-sm max-w-lg mx-auto my-8 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600">
              {error}
            </p>
          </div>
        )}

      
        {!loading && !error && validProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {validProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

       
        {!loading && !error && validProducts.length === 0 && (
          <div className="py-20 px-4 flex flex-col items-center justify-center border border-dashed border-gray-300 bg-[#F9F9F9] text-center max-w-xl mx-auto rounded-sm my-8">
            <PackageX className="w-12 h-12 text-gray-400 stroke-[1.25] mb-3" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900">
              No Products Available
            </h3>
            <p className="text-[11px] text-gray-500 tracking-wider mt-1 max-w-xs">
              Check back soon for new arrivals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;