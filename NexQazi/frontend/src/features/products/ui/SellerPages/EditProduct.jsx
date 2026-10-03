import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../api/hook/useProducts"; // Adjust path
import { Upload, X, Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, loading } = useProduct();

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const currentProduct = products.find((p) => p._id === id);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      currency: "INR",
      sizes: [{ size: "S", stock: 10 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });


  useEffect(() => {
    if (currentProduct) {
      reset({
        title: currentProduct.title,
        description: currentProduct.description,
        amount: currentProduct.price?.amount || "",
        currency: currentProduct.price?.currency || "INR",
        sizes: currentProduct.sizes || [{ size: "S", stock: 0 }],
      });

      if (currentProduct.images) {
        setImagePreviews(currentProduct.images.map((img) => img.url || img));
      }
    }
  }, [currentProduct, reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (imagePreviews.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);

    const priceAmount = parseFloat(data.amount) || 0;
    const priceCurrency = data.currency || "INR";

    const priceObj = { amount: priceAmount, currency: priceCurrency };

    formData.append("price", JSON.stringify(priceObj));
    formData.append("price.amount", priceAmount);
    formData.append("price.currency", priceCurrency);

    formData.append("sizes", JSON.stringify(data.sizes));

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await updateProduct(id, formData);
      toast.success("Product updated successfully!");
      navigate("/home/products");
    } catch (err) {
      toast.error(err?.message || "Failed to update product");
    }
  };

  if (!currentProduct) {
    return (
      <div className="p-8 text-center text-xs font-bold uppercase">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F9F9F9] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-2xl sm:text-3xl font-black uppercase font-serif text-black">
              Edit Product
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b pb-2">
              1. Basic Details
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                {...register("title", { required: "Product title is required" })}
                className="w-full border border-gray-300 p-3 text-xs focus:border-black outline-none transition-all"
              />
              {errors.title && (
                <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows="4"
                {...register("description", { required: "Description is required" })}
                className="w-full border border-gray-300 p-3 text-xs focus:border-black outline-none transition-all"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Price Amount (₹) *
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("amount", { required: "Price is required" })}
                  className="w-full border border-gray-300 p-3 text-xs focus:border-black outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  {...register("currency")}
                  readOnly
                  className="w-full border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-black">
                2. Size Variants & Stock *
              </h2>
              <button
                type="button"
                onClick={() => append({ size: "M", stock: 10 })}
                className="flex items-center gap-1 text-xs font-bold text-black hover:opacity-70 uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" /> Add Size Option
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-3">
                  <div className="w-1/2">
                    <input
                      type="text"
                      {...register(`sizes.${index}.size`, { required: "Size is required" })}
                      className="w-full border border-gray-300 p-2.5 text-xs focus:border-black outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <input
                      type="number"
                      {...register(`sizes.${index}.stock`, {
                        required: "Stock is required",
                        valueAsNumber: true,
                      })}
                      className="w-full border border-gray-300 p-2.5 text-xs focus:border-black outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b pb-2">
              3. Product Images (Max 5)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {imagePreviews.map((url, idx) => (
                <div key={idx} className="relative aspect-[3/4] border border-gray-200 bg-gray-50 overflow-hidden">
                  <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black text-white p-1 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {imagePreviews.length < 5 && (
                <label className="border-2 border-dashed border-gray-300 hover:border-black aspect-[3/4] flex flex-col items-center justify-center cursor-pointer bg-gray-50 text-gray-500 hover:text-black">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Upload</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {loading ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;