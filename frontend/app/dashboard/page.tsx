


// 'use client'

// import React, { useEffect, useState } from "react";
// import useSession from "@/hooks/useSession";
// import { useRouter } from 'next/navigation';

// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   sizes: { size: string; quantity: number }[];
//   teamId: string;
// }

// export interface Team {
//   _id: string;
//   name: string;
//   logo: string;
//   colors: { primary: string; secondary: string };
//   description: string;
//   products: Product[];
// }



// const Dashboard = () => {

//   const [products, setProducts] = useState<Product[]>([]);
//   const [team, setTeam] = useState<Team | null>(null);
//   const [error, setError] = useState("");

//   const {  isAuthenticated, loading } = useSession();
//   const router = useRouter();

//      // Redirect if not authenticated
//      useEffect(() => {
//       if (!loading && !isAuthenticated) {
//           router.push("/signin"); 
//       }
//   }, [isAuthenticated, loading, router]);


//   function getLocalStorageItem<T>(key: string): T | null {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   }

//   const user = getLocalStorageItem<{ city: string }>("user");
//   if (user?.city) {
//     console.log("City:", user.city);
//   } else {
//     console.log("City not found");
//   }
  
//   const city = user?.city

//     useEffect(() => {

//         const fetchTeamDetails = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:3000/api/products/getproducts?city=${city}`
//                 );
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch team details");
//                 }
//                 const data = await response.json();

//                 setTeam(data);
//                 setProducts(data.products);

//                 console.log("team is", data)
//                 console.log("product is", data.products)
//             } catch (err: any) {
//                 setError(err.message);
//             }
//         };

//         fetchTeamDetails();
//     }, [city]);


//     if (error) {
//       return <p className="text-red-500">{error}</p>;
//   }

//   if (!team) {
//       return <p>Loading...</p>;
//   }

//     return (
//       <>

//       <div className="dashboard">
//       {team && (
//         <div className="team-details">
//           <h1>{team.name}</h1>
//           <img src={team.logo} alt={`${team.name} logo`} />
//           <p>{team.description}</p>
//         </div>
//       )}
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             <img src={product.image} alt={product.name} />
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <p>Available Sizes: {product.sizes.map(size => `${size.size} (${size.quantity})`).join(', ')}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Dashboard;

























'use client';

import React, { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardFooter } from '@/components/ui/card'; // Assuming you're using Shadcn components

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
          const response = await fetch(`http://localhost:3000/api/products/getproducts?city=${city}`);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between mb-8">
        <Card className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{team.name}</h1>
            <img src={team.logo} alt={`${team.name} logo`} className="mt-4 w-40 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600">{team.description}</p>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-2xl transition duration-300">
            <CardHeader>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
            </CardHeader>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <p className="mt-2 font-bold text-gray-900">Price: ${product.price}</p>
              <p className="mt-2 text-sm text-gray-500">Available Sizes: {product.sizes.map(size => `${size.size} (${size.quantity})`).join(', ')}</p>
            </div>
            <CardFooter className="mt-4 flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Buy Now</button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
