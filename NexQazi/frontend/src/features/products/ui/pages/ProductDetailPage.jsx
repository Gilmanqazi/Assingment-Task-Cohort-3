import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../api/hook/useProducts";
import { useSelector } from "react-redux";
import { useCart } from "../../../cart/hook/useCart";
import { ShoppingBag, Check } from "lucide-react";
import Navbar from "../../../shared/Navbar";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { loading: productLoading, selectedProduct } = useSelector(
    (state) => state.product
  );

  const { getProductById } = useProduct();
  const { addToCartHook, loading: cartLoading } = useCart();

  const { id } = useParams();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) getProductById(id);
  }, [id]);

  const currentSizeObj = selectedProduct?.sizes?.find(
    (s) => (typeof s === "string" ? s : s.size) === selectedSize
  );

 
  const maxStock =
    typeof currentSizeObj === "object" ? currentSizeObj?.stock ?? 10 : 10;


  const handleQuantityChange = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => Math.max(1, Number(prev) - 1));
    }
    if (type === "inc" && quantity < maxStock) {
      setQuantity((prev) => Number(prev) + 1);
    }
  };

  const handleAddTocart = async () => {
    if (!selectedSize) {
      alert("Plz select size!");
      return;
    }

    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      alert("Quantity must be a valid number greater than 0");
      return;
    }

    try {
      const res = await addToCartHook({
        productId: selectedProduct?._id,
        quantity: parsedQuantity,
        size: selectedSize,
      });

      toast.success(res?.message || "Added to Cart!");
    } catch (err) {
      toast.error(err || "Failed to add product");
    }
  };


  if (productLoading || !selectedProduct) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-gray-200 aspect-[3/4] w-full rounded-sm"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 w-3/4 rounded-sm"></div>
            <div className="h-6 bg-gray-200 w-1/4 rounded-sm"></div>
            <div className="h-20 bg-gray-200 w-full rounded-sm"></div>
            <div className="h-10 bg-gray-200 w-1/2 rounded-sm"></div>
            <div className="h-12 bg-gray-200 w-full rounded-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  const imagesList = selectedProduct?.images || [];
  const currentMainImage =
    imagesList[selectedImageIndex]?.url || imagesList[0]?.url;

  return (
    <div className="w-full bg-white min-h-screen">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
       
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-start">
          
            {imagesList.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[580px] scrollbar-none w-full sm:w-auto">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 bg-gray-50 border-2 overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? "border-black opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img?.url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}

        
            <div className="w-full aspect-[3/4] bg-[#F7F7F7] overflow-hidden relative group flex items-center justify-center border border-gray-100">
              <img
                src={currentMainImage}
                alt={selectedProduct?.title}
                className="w-full h-full object-contain p-2 transition-all duration-300 cursor-zoom-in"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-black font-serif">
                {selectedProduct?.title}
              </h1>
              <p className="text-lg sm:text-xl font-black text-black mt-2">
                ₹{selectedProduct?.price?.amount}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-b py-4 border-gray-100">
              {selectedProduct?.description}
            </p>

        
            {selectedProduct?.sizes?.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                    Select Size
                  </h4>
                  {selectedSize && (
                    <span className="text-[10px] text-green-700 font-bold uppercase flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected: {selectedSize}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {selectedProduct.sizes.map((s, index) => {
                    const sizeLabel = typeof s === "string" ? s : s.size;
                    const isSelected = selectedSize === sizeLabel;

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSize(sizeLabel);
                          setQuantity(1);
                        }}
                        className={`py-3 sm:py-2.5 border text-xs font-bold uppercase transition-all flex items-center justify-center ${
                          isSelected
                            ? "bg-black text-white border-black shadow-sm"
                            : "bg-white text-black border-gray-200 hover:border-black"
                        }`}
                      >
                        {sizeLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                  Quantity
                </h4>
                {selectedSize && (
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">
                    {maxStock} items left in stock
                  </span>
                )}
              </div>

              <div className="flex items-center border border-black w-max">
                <button
                  onClick={() => handleQuantityChange("dec")}
                  disabled={quantity <= 1}
                  className="px-4 py-2.5 text-xs font-bold hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="px-5 py-2.5 text-xs font-bold select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("inc")}
                  disabled={!selectedSize || quantity >= maxStock}
                  className="px-4 py-2.5 text-xs font-bold hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

           
            <button
              onClick={handleAddTocart}
              disabled={cartLoading}
              className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{cartLoading ? "Adding to Cart..." : "Add To Cart"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;