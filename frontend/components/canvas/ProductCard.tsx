'use client';

import { Product } from "@/types";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  primary: string;
  secondary: string
}

export function ProductCard({ product, primary, secondary }: ProductCardProps) {

  return (
    <Card className={`bg-[${secondary}] bg-opacity-55 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-auto`}>
      <CardHeader className="p-4">
        <div className="relative h-64 overflow-hidden]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />

        </div> 
      </CardHeader>
      <div className="p-4">
        <div className="flex flex-row justify-between">
                <h3 className="text-lg font-bold text-[#0f4a8a] mb-2">{product.name}</h3>
                <div className=" top-2 right-2">
            <Badge className="bg-[#0f4a8a] text-white">₹{product.price}</Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes.map((size) => (
            <Badge 
              key={size.size} 
              variant="outline" 
              className="border-[#0f4a8a] text-[#0f4a8a]"
            >
              {size.size} ({size.quantity})
            </Badge>
          ))}
        </div>

      </div>
      <CardFooter className="p-4 bg-gray-50">
        <Button 
          className={`w-full bg-[${primary}] hover:bg-[${primary}-dark flex items-center justify-center gap-2 text-black`}
        >
          <ShoppingCart className={`text-black w-4 h-4 `} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}