import React from 'react';
import ProductForm from '../../components/ProductForm';
import type ProductType from '../../types/Product';
import cloudinary from '../../api/Cloudinary';
import supabase from '../../api/Supabase';
import getCreatedAt from '../../utilities/GetCurrentTime';

const Create:React.FC = () => {
  let newProduct:ProductType = {
    name: '',
    price: 0,
    sale_price: 0,
    sale_percent: 0,
    description: '',
    amount: 0,
    images: [],
    image_files: [],
    created_at: '',
    updated_at: ''
  };

  let data = [newProduct];

  const handleData = async (data:ProductType) => {
    newProduct.name = data.name;
    newProduct.price = data.price;
    newProduct.sale_price = data.sale_price;
    newProduct.sale_percent = ((data.price - data.sale_price)/data.price)*100;
    newProduct.amount = data.amount;
    newProduct.description = data.description;
    newProduct.created_at = getCreatedAt();
    newProduct.updated_at = getCreatedAt();

    let {images} = data;
    let fileList = images.fileList;
    newProduct.image_files = fileList;

    for(var i=0; i<fileList.length; i++){
      let {originFileObj} = fileList[i];
      let imageUrl = await cloudinary(originFileObj);
      newProduct.images.push({'status':'done', 'url':imageUrl});
    }

    const { error } = await supabase
      .from('product')
      .insert([newProduct])
      .select()

    return true;
  }

  return (
    <ProductForm data={data} handleData={handleData} title="add product"/>
  )
}

export default Create;
