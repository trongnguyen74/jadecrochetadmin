import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BlogForm from '../../components/BlogForm';
import type BlogType from '../../types/Blog';
import cloudinary from '../../api/Cloudinary';
import supabase from '../../api/Supabase';

let newDetail:BlogType = {
  title: '',
  content: '',
  created_at: '',
};

const Detail = () => {
  let {id} = useParams();
  let [detail, setDetail] = useState<any>([]);
  const [isData, setIsData] = useState(false);

  async function getBlogDetail() {
    let {data} = await supabase.from('blog').select('*').eq('id', id);
    setDetail(data);
    setIsData(true);
  }

  const handleData = async (data:BlogType) => {
    newDetail.title = data.title;
    newDetail.content = data.content;
    newDetail.created_at = detail.created_at;

    const { error } = await supabase
      .from('blog')
      .update(newDetail)
      .eq('id', id)
      .select()

    return true;
  }

  useEffect(() => {
    getBlogDetail();
  }, []);

  if(isData){
    return (
      <BlogForm data={detail} handleData={handleData} h2={'blog detail #' + id} />
    )
  }
  else{
    return <div></div>
  }
}

export default Detail;
