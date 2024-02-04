import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductForm from '../../components/ProductForm';
import type ProductType from '../../types/Product';
import cloudinary from '../../api/Cloudinary';
import supabase from '../../api/Supabase';
import getUpdatedAt from '../../utilities/GetCurrentTime';

let newDetail:ProductType = {
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

const Detail = () => {
  let {id} = useParams();
  let [detail, setDetail] = useState<any>([]);
  const [isData, setIsData] = useState(false);

  async function getProductDetail() {
    let {data} = await supabase.from('product').select('*').eq('id', id);
    setDetail(data);
    setIsData(true);
  }

  const handleData = async (data:ProductType) => {
    newDetail.name = data.name;
    newDetail.price = data.price;
    newDetail.sale_price = data.sale_price;
    newDetail.sale_percent = ((data.price - data.sale_price)/data.price)*100;
    newDetail.amount = data.amount;
    newDetail.description = data.description;
    newDetail.images = [];
    newDetail.created_at = detail.created_at;
    newDetail.updated_at = getUpdatedAt();

    let {images} = data;
    let fileList = images.fileList;
    newDetail.image_files = fileList;

    for(var i=0; i<fileList.length; i++){
      let {originFileObj} = fileList[i];
      if(typeof(originFileObj.name) == 'string'){ //check if obj is File type
        let imageUrl:string = await cloudinary(originFileObj);
        newDetail.images.push({'status': 'done', 'url': imageUrl});
      }
      else{
        let {url} = fileList[i];
        newDetail.images.push({'status': 'done', 'url': url});
      }
    }

    const { error } = await supabase
      .from('product')
      .update(newDetail)
      .eq('id', id)
      .select()

    return true;
  }

  useEffect(() => {
    getProductDetail();
  }, []);

  if(isData){
    return (
      <ProductForm data={detail} handleData={handleData} title={'product detail #' + id} />
    )
  }
  else{
    return <div></div>
  }
}

export default Detail;
