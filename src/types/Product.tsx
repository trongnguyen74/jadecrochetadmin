import React from 'react';

export default interface Product {
  id?: number,
  name: string,
  price: number,
  sale_price: number,
  sale_percent: number,
  description: string,
  amount: number,
  images: any,
  image_files: any,
  created_at: string,
  updated_at: string
}
