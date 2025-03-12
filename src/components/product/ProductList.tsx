import React from 'react';
import { getProducts } from '@/lib/getProducts';
import ProductComponent from './ProductComponent';

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="flex flex-col space-y-4">
      {products.map((product) => (
        <ProductComponent 
          key={product.product_id}
          product={product}
        />
      ))}
    </div>
  );
} 