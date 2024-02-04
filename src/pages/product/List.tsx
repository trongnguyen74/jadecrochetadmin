import React from 'react';
import { useState, useEffect } from 'react';
import ProductList from "../../components/ProductList";
import supabase from '../../api/Supabase';

const List:React.FC = () => {
  const [productList, setProductList] = useState<any>([]);
  const [isData, setIsData] = useState(false);

  async function getProductList() {
    let {data} = await supabase.from('product').select('*');
    setProductList(data);
    setIsData(true);
  }

  useEffect(() => {
    getProductList();
  }, []);

  if(isData){
    return (
      <ProductList data={productList}/>
    )
  }
  else{
    return <div></div>
  }
}

export default List;
