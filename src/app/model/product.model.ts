export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public image: string,
    public technicalDetails: string
  ) {}
}

// product.model.ts
export interface ProductInterFace {
  name: string;
  category: string;
  imageUrl: string; // Add this line
}
