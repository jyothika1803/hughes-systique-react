import { controllers } from "chart.js";
import React, { useEffect, useState } from "react";
import { $crud } from "../factory/crudFactory";
import { BASE_ASSETS_URL } from "../constants/bassPath";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = async () => {
    try {
      const {
        data: { products },
      } = await $crud.retrieve("products");
      setProducts(() => products);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!products.length) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">
          🛍️ Products Sold
        </h2>
        <p className="text-gray-600 text-lg">No products added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-2xl shadow-xl lg:col-span-4 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        📦 Products Sold
      </h2>
      <ul className="space-y-6 text-sm">
        {products.map((p) => (
          <li
            key={p.id}
            className="border border-indigo-100 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Product Media */}
              <div className="flex flex-col items-center gap-3 md:w-1/3">
                {/* Image */}
                {p.imageFile && (
                  <div className="relative">
                    <img
                      src={BASE_ASSETS_URL + `product/image/${p.imageFile}`}
                      alt={p.name}
                      className="h-32 w-32 object-cover rounded-lg shadow-md border border-gray-200 hover:scale-105 transition-transform duration-200"
                    />
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow">
                      Image
                    </span>
                  </div>
                )}

                {/* Video */}
                {p.videoFile && (
                  <div className="relative mt-2">
                    <video
                      controls
                      src={BASE_ASSETS_URL + `product/video/${p.videoFile}`}
                      className="rounded-lg shadow-md border border-gray-200 hover:scale-105 transition-transform duration-200 w-60 h-36"
                    />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow">
                      Video
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🏷️ {p.name}
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">
                    ID: {p.id}
                  </span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {p.description || "No description available."}
                </p>

                <div className="text-gray-700 text-sm mt-3 space-y-1">
                  <p>
                    <span className="font-medium text-indigo-600">
                      Dimensions:
                    </span>{" "}
                    {p.length} x {p.width} x {p.height}
                    
                  </p>
                  <p>
                    <span className="font-medium text-indigo-600">
                      Validity:
                    </span>{" "}
                    {p.validFrom} - {p.validTo}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardProducts;
