import React, { useState, useEffect } from "react";
import { $crud } from "../factory/crudFactory";

const Orders = () => {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    productId: "",
    qty: "",
    description: "",
    address: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  //  Fetch products
  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = async () => {
    try {
      const { data: { products } } = await $crud.retrieve("products");
      setProducts(products);
    } catch (e) {
      console.error("Error retrieving Products:", e);
    }
  };

  //  Validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "productId":
        if (!value) error = "Product is required";
        break;
      case "qty":
        if (!value) error = "Quantity is required";
        break;
      case "description":
        if (!value) error = "Description is required";
        break;
      case "address":
        if (!value) error = "Address is required";
        break;
      case "pincode":
        if (!value) error = "Pin Code is required";
        break;
      case "phone":
        if (!value) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value)) error = "Phone number must be exactly 10 digits";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      default:
        break;
    }

    return error;
  };

  const validateAll = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsFormValid(validateAll());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  //  Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      await $crud.create("order", formData);

      alert("✅ Order submitted successfully!");

      setFormData({
        productId: "",
        qty: "",
        description: "",
        address: "",
        pincode: "",
        phone: "",
        email: "",
      });
      setErrors({});
    } catch (e) {
      console.log("Order Error:", e.message);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl shadow-xl max-w-lg mx-auto mt-10 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 tracking-wide">
        🧾 Place Your Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-md border border-indigo-100">

        {/* Product Dropdown */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Select Product
          </label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 focus:ring-2 ${errors.productId ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">-- Select Product --</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>{prod.id}</option>
            ))}
          </select>
          {errors.productId && <p className="text-red-500 text-sm mt-1">{errors.productId}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${errors.qty ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.qty && <p className="text-red-500 text-sm mt-1">{errors.qty}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full border rounded-lg p-3 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full border rounded-lg p-3 ${errors.address ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Pincode */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Pin Code</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full mt-4 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 transform ${isFormValid
            ? "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          🚀 Submit Order
        </button>
      </form>
    </div>
  );
};

export default Orders;
