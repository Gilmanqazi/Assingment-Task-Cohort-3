import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Added missing import
import { useProduct } from "../../api/hook/useProducts"; // Path verify kar lein
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  Tag,
  Layers,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";

const SellerProducts = () => {
  const navigate = useNavigate();
  const { deleteProduct, loading } = useProduct();

  const storeProducts = useSelector((state) => state.product?.products || []);
  const user = useSelector((state) => state.auth?.user);

  const sellerProducts = storeProducts.filter(
    (item) =>
      item.sellerId === user?._id ||
      item.user === user?._id ||
      item.seller === user?._id
  );


  const displayProducts =
    sellerProducts.length > 0 ? sellerProducts : storeProducts;

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted successfully!");
      } catch (err) {
        toast.error(err?.message || "Failed to delete product");
      }
    }
  };

  const totalProducts = displayProducts.length;
  const totalStock = displayProducts.reduce((acc, curr) => {
    const sizeStock =
      curr.sizes?.reduce((sAcc, s) => sAcc + Number(s.stock || 0), 0) || 0;
    return acc + sizeStock;
  }, 0);

  return (
    <div className="w-full bg-[#F9F9F9] h-screen py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-black text-white p-6 sm:p-8 rounded-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              NEXTQAZI Seller Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase font-serif tracking-tight mt-1">
              Seller Dashboard
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Manage your brand inventory, update products, and track catalog
              performance.
            </p>
          </div>

          <button
            onClick={() => navigate("/home/create/products")}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Total Products Listed
              </p>
              <h3 className="text-2xl font-black text-black mt-1">
                {totalProducts}
              </h3>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-sm text-black">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Total Inventory Items
              </p>
              <h3 className="text-2xl font-black text-black mt-1">
                {totalStock} units
              </h3>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-sm text-black">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Quick Action
              </p>
              <button
                onClick={() => navigate("/home/products")}
                className="flex items-center gap-1 text-xs font-black text-black uppercase tracking-wider hover:underline mt-2"
              >
                View Store Front <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-sm text-black">
              <Tag className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-black">
              Your Product Catalog ({totalProducts})
            </h2>
          </div>

          {displayProducts.length === 0 ? (
            <div className="bg-white border border-gray-200 p-12 text-center rounded-sm space-y-4">
              <Package className="w-10 h-10 text-gray-300 mx-auto" />
              <div>
                <p className="text-xs font-bold uppercase text-gray-700">
                  No Products Found in Store
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Start listing products to display them on NEXTQAZI store
                  front.
                </p>
              </div>
              <button
                onClick={() => navigate("/home/create/products")}
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Create First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => {
                const mainImage =
                  product.images?.[0]?.url || product.images?.[0] || "";
                return (
                  <div
                    key={product._id || product.id}
                    className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden rounded-sm relative">
                        {mainImage ? (
                          <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold uppercase text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      <h3 className="text-xs font-bold uppercase text-black line-clamp-1 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-xs font-black text-black mb-2">
                        ₹
                        {product.price?.amount ||
                          product.price ||
                          product.amount ||
                          0}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.sizes?.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-bold bg-gray-100 px-1.5 py-0.5 rounded-sm border border-gray-200 text-gray-600 uppercase"
                          >
                            {s.size}: {s.stock}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() =>
                          navigate(
                            `/home/edit/products/${product._id || product.id}`
                          )
                        }
                        className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-black hover:text-white text-black py-2 text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id || product.id)}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 py-2 text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
