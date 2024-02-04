import React from 'react';
import BlogForm from '../../components/BlogForm';
import type BlogType from '../../types/Blog';
import supabase from '../../api/Supabase';
import getCreatedAt from '../../utilities/GetCurrentTime';

const Create:React.FC = () => {
  let newBlog:BlogType = {
    title: '',
    content: '',
    created_at: '',
  };

  let data = [newBlog];

  const handleData = async (data:BlogType) => {
    newBlog.title = data.title;
    newBlog.content = data.content;
    newBlog.created_at = getCreatedAt();

    const { error } = await supabase
      .from('blog')
      .insert([newBlog])
      .select()

    return true;
  }

  return (
    <BlogForm data={data} handleData={handleData} h2="add blog"/>
  )
}

export default Create;
