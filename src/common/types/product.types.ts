export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: "NPR";
  image: string;
  images: string[];
  category: string;
  featured: boolean;
  sizes: string[];
  description: string;
  details: string[];
};
