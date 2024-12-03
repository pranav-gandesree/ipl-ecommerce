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