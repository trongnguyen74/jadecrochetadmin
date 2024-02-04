import React from 'react';
import {useState, useRef, useEffect} from 'react';
import { Button, Form, Input, InputNumber, Image, Space, Modal, Upload, Alert, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import type ProductType from '../types/Product';
import getUpdatedAt from '../utilities/GetCurrentTime';

interface Props {
  data: any;
  handleData: (data:ProductType) => void;
  title: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProductForm:React.FC<Props> = (props:Props) => {
  const {data, handleData, title} = props;
  const productData:ProductType = data[0];
  const {image_files, images, created_at, updated_at} = productData;
  const [form] = Form.useForm();
  const [updatedAt, setUpdatedAt] = useState<string>(updated_at);

  if(images.length > 0){
    images.map((obj:any, index:number) => {
      image_files[index].url = obj.url;
    })
  }

  //handle image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const [fileList, setFileList] = useState<UploadFile[]>(image_files);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  }

  //handle submit form
  const onFinish = async (values: ProductType) => {
    values.images.fileList = fileList;
    let isSuccess:any = handleData(values);
    if(isSuccess){
      message.success('Success!');
    }
    let newUpdatedAt = getUpdatedAt();
    setUpdatedAt(newUpdatedAt);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    form.resetFields();
  }, [productData]);

  return (
    <div className="form-wrapper">
      <h2>{title}</h2>
      {
        (created_at && updatedAt &&
          <div style={{display: 'flex', justifyContent: 'center', padding: '6px', marginBottom: '6px', color: '#808080'}}>
            <span style={{marginRight: '12px'}}>Created at: {created_at}</span>
            <span>Last updated: {updatedAt}</span>
          </div>
        )
      }
      <Form
        form={form}
        initialValues={productData}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input placeholder="Name here!"/>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input price!' }]}
        >
          <InputNumber min={0} prefix="VND" style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item
          label="Sale price"
          name="sale_price"
          rules={[{ required: false}]}
        >
          <InputNumber min={0} prefix="VND" style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please input amount!'}]}
        >
          <InputNumber style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <Input.TextArea placeholder="Say something about your product!"/>
        </Form.Item>

        <Form.Item
          label="Images"
          name="images"
          rules={[{ required: true, message: 'Please choose image!' }]}
        >
        <Upload
          beforeUpload={() => false}
          onPreview={handlePreview}
          multiple
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
        </Form.Item>
        <Modal open={previewOpen} onCancel={handleCancel} footer={null} style={{ top: '10px'}}>
          <img style={{ width: '100%'}} src={previewImage} />
        </Modal>

        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ProductForm;
