export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'men' | 'women' | 'accessories';
  rating: number;
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Filter {
  category: string[];
  priceRange: [number, number];
  rating: number | null;
}