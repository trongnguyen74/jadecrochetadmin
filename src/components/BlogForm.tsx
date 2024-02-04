import React from 'react';
import {useState, useRef, useEffect} from 'react';
import { Button, Form, Input, InputNumber, Image, Space, Modal, Upload, Alert, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import type BlogType from '../types/Blog';

interface Props {
  data: any;
  handleData: (data:BlogType) => void;
  h2: string;
}

const BlogForm:React.FC<Props> = (props:Props) => {
  const {data, handleData, h2} = props;
  const blogData:BlogType = data[0];
  const {title, content, created_at} = blogData;
  const [form] = Form.useForm();

  //handle submit form
  const onFinish = async (values: BlogType) => {
    let isSuccess:any = handleData(values);
    if(isSuccess){
      message.success('Success!');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    form.resetFields();
  }, [blogData]);

  return (
    <div className="form-wrapper">
      <h2>{h2}</h2>
      {
        (created_at &&
          <div style={{display: 'flex', justifyContent: 'center', padding: '6px', marginBottom: '6px', color: '#808080'}}>
            <span>Created at: {created_at}</span>
          </div>
        )
      }
      <Form
        form={form}
        initialValues={blogData}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input placeholder="Title here!"/>
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input content!' }]}
        >
          <Input.TextArea placeholder="Write something here!" autoSize={{ minRows: 10, maxRows: 150 }} showCount />
        </Form.Item>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogForm;
