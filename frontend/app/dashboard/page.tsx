
"use client";

import React, { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/canvas/ProductCard";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: { size: string; quantity: number }[];
  teamId: string;
}

export interface Team {
  _id: string;
  name: string;
  logo: string;
  colors: { primary: string; secondary: string };
  description: string;
  products: Product[];
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [error, setError] = useState("");

  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, loading, router]);

  function getLocalStorageItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  const user = getLocalStorageItem<{ city: string }>("user");
  const city = user?.city;

  useEffect(() => {
    if (city) {
      const fetchTeamDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/products/getproducts?city=${city}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch team details");
          }
          const data = await response.json();
          setTeam(data);
          setProducts(data.products);
        } catch (err: any) {
          setError(err.message);
        }
      };

      fetchTeamDetails();
    }
  }, [city]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!team) {
    return <p className="text-center">Loading...</p>;
  }

  const { primary, secondary } = team.colors;
  console.log("primaru is", primary)

  return (
    // <div className={`relative min-h-screen bg-gradient-to-b from-${primary}-500 to-transparent`}>
    <div
  className="relative min-h-screen bg-gradient-to-b"
  style={{
    backgroundImage: `linear-gradient(to bottom, ${primary}90, transparent)`,
  }}
>


   <div className="relative z-10 container mx-auto px-4 py-8">
         <div className="flex flex-col md:flex-row items-center gap-6">
           <img
             src={team.logo}
             alt={`${team.name} Logo`}
             className="w-32 h-32 object-contain" />
           <div className="text-center md:text-left">
             <h1 className={`text-3xl md:text-4xl font-bold text-[${primary}] mb-2`}>
               {team.name} Official Store
             </h1>
             <p className={`text-[${primary}] max-w-2xl`}>{team.description}</p>
           </div>
         </div>
       </div>
       
       <main className="container mx-auto px-4 py-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {products.map((product) => (
               <ProductCard key={product._id} product={product} primary={primary} secondary= {secondary} />
             ))}
           </div>
         </main>

    </div>
  );
};

export default Dashboard;
