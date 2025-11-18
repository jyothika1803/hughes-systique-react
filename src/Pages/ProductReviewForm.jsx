import React, { useEffect, useState } from "react";

export default function ProductReviewForm() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productId: "", email: "", phone: "", review: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const validateEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const validatePhone = (phone) => /^\+?[0-9]{10,15}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) return setMessage("Invalid email format.");
    if (!validatePhone(form.phone)) return setMessage("Invalid phone number.");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("✅ Review submitted successfully!");
        setForm({ productId: "", email: "", phone: "", review: "" });
      } else setMessage("❌ Failed to submit review.");
    } catch {
      setMessage("⚠️ Network error.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-slate-200"
      >
        <h2 className="text-2xl font-semibold text-blue-900 text-center">
          Product Review Form
        </h2>

        <div>
          <label className="block mb-2 font-medium text-slate-700">Product</label>
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name || p.id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">Phone</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+911234567890"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">Review</label>
          <textarea
            name="review"
            value={form.review}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-medium py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Submit Review
        </button>

        {message && (
          <div className="text-center mt-3 text-sm font-medium text-slate-700">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
