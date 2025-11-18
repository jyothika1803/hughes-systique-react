import React, { useRef, useState } from "react";
import { $crud } from "../factory/crudFactory";

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

const Products = () => {
  const [formData, setFormData] = useState({
    id: generateId(),
    name: "",
    description: "",
    dimensions: { length: "", width: "", height: "", weight: "" },
    validity: { from: "", to: "" },
    images: [],
    videos: []
  });

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["length", "width", "height", "weight"].includes(name)) {
      setFormData({
        ...formData,
        dimensions: { ...formData.dimensions, [name]: value }
      });
    } else if (["from", "to"].includes(name)) {
      setFormData({
        ...formData,
        validity: { ...formData.validity, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    const filesWithInfo = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setFormData({ ...formData, [type]: [...formData[type], ...filesWithInfo] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const data = await $crud.create("product", formData);
      console.log(data);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl max-w-3xl mx-auto mt-10 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 tracking-wide">
        🛍️ Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-indigo-100"
        ref={formRef}
      >
        {/* Product Info */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            rows="3"
            required
          />
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4 border p-4 rounded-xl bg-indigo-50">
          <h3 className="col-span-2 font-semibold text-indigo-700">
            📏 Dimensions
          </h3>
          {["length", "width", "height", "weight"].map((dim) => (
            <div key={dim}>
              <label className="font-medium text-gray-600 capitalize">
                {dim}
              </label>
              <input
                type="text"
                name={dim}
                value={formData.dimensions[dim]}
                onChange={handleChange}
                className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>
          ))}
        </div>

        {/* Validity */}
        <div className="grid grid-cols-2 gap-4 bg-green-50 border p-4 rounded-xl">
          <h3 className="col-span-2 font-semibold text-green-700">
            ⏰ Validity Period
          </h3>
          <div>
            <label className="font-medium text-gray-600">From</label>
            <input
              type="date"
              name="from"
              value={formData.validity.from}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-600">To</label>
            <input
              type="date"
              name="to"
              value={formData.validity.to}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl border">
            <label className="font-semibold text-blue-700 mb-1 block">
              📸 Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              name="imageFile"
              multiple
              onChange={(e) => handleFileChange(e, "images")}
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
            />
            {formData.images.length > 0 && (
              <ul className="text-xs mt-2 text-gray-600 list-disc list-inside">
                {formData.images.map((img, idx) => (
                  <li key={idx}>{img.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border">
            <label className="font-semibold text-purple-700 mb-1 block">
              🎥 Upload Videos
            </label>
            <input
              type="file"
              accept="video/*"
              name="videoFile"
              multiple
              onChange={(e) => handleFileChange(e, "videos")}
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-purple-300"
            />
            {formData.videos.length > 0 && (
              <ul className="text-xs mt-2 text-gray-600 list-disc list-inside">
                {formData.videos.map((vid, idx) => (
                  <li key={idx}>{vid.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md"
        >
          💾 Save Product
        </button>
      </form>
    </div>
  );
};

export default Products;
