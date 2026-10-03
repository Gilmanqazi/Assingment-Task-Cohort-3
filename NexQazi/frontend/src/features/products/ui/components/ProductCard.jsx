import {Link} from "react-router-dom"
const ProductCard = ({ product }) => {

  const imageUrl = product?.images?.[0]?.url;

if(!product || !product.title) return null


  return (
    <section>
          <Link to={`/home/product/${product?._id}`} key={product?._id} className="group block">
         
            <div className="w-full h-80 bg-gray-200 overflow-hidden relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product?.title}
                  className="w-full h-full object-cover  group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  No Image
                </div>
              )}
            </div>

           
            <div className="mt-3 flex justify-between items-start">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-black">
                  {product?.title}
                </h3>
                {product?.price?.amount && (
                  <p className="text-xs font-bold mt-1 text-black">
                    ₹{product.price.amount}
                  </p>
                )}
              </div>
            </div>
      </Link>
    </section>
  );
};

export default ProductCard;