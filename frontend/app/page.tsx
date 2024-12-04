'use client'

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Hero() {

  const router = useRouter();

  return (
    <>
     <nav className="bg-blue-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-8 h-8" />
          <span className="text-2xl font-bold">IKART</span>
        </div>
      </div>
    </nav>
  

    <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">Support Your Team in Style</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Get authentic IPL team jerseys and show your passion for cricket. 
            Premium quality merchandise for true cricket fans.
          </p>
          <button   onClick={() => router.push('/signup')} className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold 
                           hover:bg-yellow-400 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </div>
    </>
  );
}