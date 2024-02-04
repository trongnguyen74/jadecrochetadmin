import React from 'react';
import { useState, useEffect } from 'react';
import BlogList from "../../components/BlogList";
import type BlogType from '../../types/Blog';
import supabase from '../../api/Supabase';

const List:React.FC = () => {
  const [blogList, setBlogList] = useState<any>([]);
  const [isData, setIsData] = useState(false);

  async function getBlogList() {
    let {data} = await supabase.from('blog').select('*');
    setBlogList(data);
    setIsData(true);
  }

  useEffect(() => {
    getBlogList();
  }, []);

  const handleDelete = async (keys:any) => {
    let newList:any = [];
    blogList.map((obj:BlogType, index:number) => {
      let {id} = obj;
      if(keys.includes(id) != true){
        newList.push(obj);
      }
    })
    setBlogList(newList);


    const { error } = await supabase
      .from('blog')
      .delete()
      .eq('id', keys)
      
    return true;
  }

  if(isData){
    return (
      <BlogList data={blogList} handleDelete={handleDelete}/>
    )
  }
  else{
    return <div></div>
  }
}

export default List;
