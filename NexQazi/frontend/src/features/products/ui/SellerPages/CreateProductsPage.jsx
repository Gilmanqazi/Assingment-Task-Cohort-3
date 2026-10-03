import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useProduct } from "../../api/hook/useProducts";
import { Upload, X, Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const CreateProductsPage = () => {
  const navigate = useNavigate();
  const { createProduct } = useProduct();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors,isSubmitting },
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

 
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (images.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const updatedImages = [...images, ...files];
    setImages(updatedImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };


  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error("Please upload at least 1 product image");
      return;
    }
  
    const formData = new FormData();
  
    
    formData.append("title", data.title);
    formData.append("description", data.description);
  
   
    const priceAmount = parseFloat(data.price?.amount || data.amount) || 0;
    const priceCurrency = data.price?.currency || data.currency || "INR";
  
    const priceObj = {
      amount: priceAmount,
      currency: priceCurrency,
    };
  
    
    formData.append("price", JSON.stringify(priceObj));
  
   
    formData.append("price.amount", priceAmount);
    formData.append("price.currency", priceCurrency);
  
    
    formData.append("sizes", JSON.stringify(data.sizes));
  
 
    images.forEach((file) => {
      formData.append("images", file);
    });
  
    try {
      await createProduct(formData);
      toast.success("Product created successfully!");
      navigate("/home/products");
    } catch (err) {
      toast.error(err?.message || "Failed to create product");
    }
  };

  return (
    <div className="w-full bg-[#F9F9F9] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-2xl sm:text-3xl font-black uppercase font-serif text-black">
              Create New Product
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b pb-2">
              1. Basic Information
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Heavyweight Cotton Oversized T-Shirt"
                className="w-full border border-gray-300 p-3 text-xs focus:border-black outline-none transition-all"
                {...register("title", { required: "Product title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Title cannot exceed 20 characters",
                  },
                 })}
              />
              {errors.title && (
                <span className="text-red-500 text-[11px] font-bold mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows="4"
                placeholder="Fabric details, size fit guidelines, care instructions..."
                className="w-full border border-gray-300 p-3 text-xs focus:border-black outline-none transition-all"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters long",
                  },
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                })}
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-[11px] font-bold mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Price Amount (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1499"
                  className="w-full border border-gray-300 p-3 text-xs focus:border-black outline-none transition-all"
                  {...register("amount", {
                    required: "Price amount is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                />
                {errors.amount && (
                  <span className="text-red-500 text-[11px] font-bold mt-1 block">
                    {errors.amount.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  readOnly
                  className="w-full border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500 font-bold"
                  {...register("currency")}
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
                <div key={field.id} className="flex items-center gap-3">
                  <div className="w-1/2">
                    <input
                      type="text"
                      placeholder="Size (e.g. S, M, L, XL)"
                      className="w-full border border-gray-300 p-2.5 text-xs focus:border-black outline-none"
                      {...register(`sizes.${index}.size`, {
                        required: "Size name required",
                      })}
                    />
                  </div>

                  <div className="w-1/2">
                    <input
                      type="number"
                      placeholder="Stock Qty"
                      className="w-full border border-gray-300 p-2.5 text-xs focus:border-black outline-none"
                      {...register(`sizes.${index}.stock`, {
                        required: "Stock required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Min stock 0" },
                      })}
                    />
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b pb-2">
              3. Product Images (Max 5 Images) *
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {imagePreviews.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[3/4] border border-gray-200 bg-gray-50 overflow-hidden group"
                >
                  <img
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {imagePreviews.length < 5 && (
                <label className="border-2 border-dashed border-gray-300 hover:border-black aspect-[3/4] flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-white transition-all text-gray-500 hover:text-black">
                  <Upload className="w-6 h-6 mb-1 stroke-[1.5]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

       
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50"
          >
             {isSubmitting ? "Creating Product..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductsPage;