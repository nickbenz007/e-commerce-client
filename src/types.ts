export interface ProductCardProps {
  _id: string;
  productName: string;
  description: string;
  imageUrl: {
    main: string;
    sub_images: string[];
  };
  stockQuantity: number;
  price: number;
}
