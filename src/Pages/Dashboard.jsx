import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import { Progress } from '../components/ui/progress.jsx';
import { ChartNoAxesColumnIncreasing, UserRound, Download, ShoppingBag, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import revenueData from '../data/revenueData.js';
import visitorData from '../data/visitorData.js';
import satisfactionData from '../data/satisfactionData.js';
import targetRealityData from '../data/targetRealityData.js';
import volumeServiceData from '../data/volumeServiceData.js';
import topProducts from '../data/topProductsData.js';
import summaryData from '../data/summaryData.js';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import DashboardProducts from './DashboardProducts.jsx';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAvClaMRLkyDOWVwisn2zJLvNzaoJtSiT0',
  });

  const center = {
    lat: 28.6139,
    lng: 77.2090,
  };

  const [coords, setCoords] = useState(center);

  if (!isLoaded) return null;

  
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoords({ lat, lng });
    navigate("/map", { state: { lat, lng } });
  };

  return (
    <div className="pt-2 px-4 space-y-4 bg-gray-50 min-h-screen">

      {/* Top Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Today's Sales</h2>
              <p className="text-gray-500 text-sm">Sales Summary</p>
            </div>
            <button className="flex items-center px-3 py-2 bg-gray-100 text-sm text-gray-700 rounded-md hover:bg-gray-200 shadow cursor-pointer">
              <Download className="mr-2" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-pink-100 p-4 rounded-lg text-center">
              <div className="flex justify-center">
                <div className="rounded-full p-3 bg-white shadow text-pink-600">
                  <ChartNoAxesColumnIncreasing size={24} />
                </div>
              </div>
              <div className="text-lg font-bold mt-2">{summaryData.totalSales}</div>
              <p className="text-sm text-gray-700">Total Sales</p>
              <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
            </div>

            {summaryData.summary.map((item, idx) => {
              const bgColors = ['bg-yellow-100', 'bg-green-100', 'bg-purple-100'];
              const iconColors = ['text-orange-600', 'text-green-600', 'text-purple-600'];
              const Icon = item.icon;

              const handleCardClick = () => {
                // if (item.title === "Total Orders") {
                //   navigate("/total-orders");
                // }
                if(item.navigate){
                  navigate(item.navigate);
                }
              };

              return (
                <div
                  key={idx}
                  onClick={handleCardClick}
                  className={`${bgColors[idx]} p-4 rounded-lg text-center cursor-pointer hover:shadow-md`}
                >
                  <div className="flex justify-center">
                    <div className={`rounded-full p-3 bg-white shadow ${iconColors[idx]}`}>
                      <Icon />
                    </div>
                  </div>
                  <div className="text-lg font-bold mt-2">{item.value}</div>
                  <p className="text-sm text-gray-700">{item.title}</p>
                  <p className="text-xs text-green-600 mt-1">{item.change}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visitor Insights */}
        <div className="bg-white p-6 rounded-xl shadow col-span-1">
          <h2 className="text-xl font-semibold mb-4">Visitor Insights</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={visitorData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loyal" stroke="#3B82F6" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="new" stroke="#10B981" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="unique" stroke="#EF4444" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue + Satisfaction + Target vs Reality */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Total Revenue</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="online" fill="#3B82F6" />
              <Bar dataKey="offline" fill="#78C841" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Satisfaction */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Satisfaction</h2>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={satisfactionData}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Line dataKey="last" stroke="#60A5FA" strokeWidth={2} dot={false} />
              <Line dataKey="current" stroke="#78C841" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          {/* Stats Below */}
          <div className="flex justify-center gap-12 mt-6 text-sm">
            <div>
              <p className="text-gray-500">Last Month</p>
              <p className="font-semibold text-gray-800">$3,004</p>
            </div>
            <div>
              <p className="text-gray-500">This Month</p>
              <p className="font-semibold text-gray-800">$4,504</p>
            </div>
          </div>
        </div>

        {/* Target vs Reality */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Target vs Reality</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={targetRealityData}>
              <XAxis dataKey="month" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="target" fill="#FACC15" />
              <Bar dataKey="actual" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>

          {/* Stats Below */}
          <div className="flex justify-center gap-12 mt-6 text-sm">
            <div>
              <p className="text-gray-500">Reality Sales</p>
              <p className="font-semibold text-blue-600">8,823</p>
            </div>
            <div>
              <p className="text-gray-500">Target Sales</p>
              <p className="font-semibold text-yellow-600">12,123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Products + Map + Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-4">
          <h2 className="text-lg font-bold mb-2">Top Products</h2>
          <div className="h-px bg-gray-200 mb-3" />
          <div className="grid grid-cols-12 text-sm text-gray-500 font-medium mb-2">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Name</div>
            <div className="col-span-3 text-center">Popularity</div>
            <div className="col-span-2 text-right">Sales</div>
          </div>

          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center text-sm text-gray-800">
                <div className="col-span-1 text-gray-500 font-semibold">{String(idx + 1).padStart(2, '0')}</div>
                <div className="col-span-6 truncate pr-2">{product.name}</div>
                <div className="col-span-3 flex items-center justify-center">
                  <Progress value={product.percent} className="h-2 w-16 bg-gray-200 rounded-full" />
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs font-medium bg-blue-500 text-white px-2 py-0.5 rounded">
                    {product.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Mapping */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Sales Mapping by Country</h2>
          <div className="relative cursor-pointer">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ height: '300px', width: '100%' }}
                center={center}
                zoom={2}
                onClick={handleMapClick}   
              />
            ) : (
              <p className="text-gray-600">Loading map...</p>
            )}

            {/* Coordinate Display */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }}
            >
              Lat: {coords.lat.toFixed(4)} | Lng: {coords.lng.toFixed(4)}
            </div>
          </div>
        </div>

        {/* Volume vs Service */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-3 ">
          <h2 className="text-lg font-semibold mb-4">Volume vs Service Level</h2>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={volumeServiceData}>
              <XAxis dataKey="week" hide />
              <YAxis hide />
              <Bar dataKey="Volume" stackId="a" fill="#3B82F6" barSize={8} />
              <Bar dataKey="Service" stackId="a" fill="#10B981" barSize={8} />
            </BarChart>
          </ResponsiveContainer>

          {/* Stats Below */}
          <div className="flex justify-center gap-12 mt-6 text-sm">
            <div>
              <p className="text-gray-500">Volume</p>
              <p className="font-semibold text-blue-600">1,200</p>
            </div>
            <div>
              <p className="text-gray-500">Services</p>
              <p className="font-semibold text-green-600">800</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;