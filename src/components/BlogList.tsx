import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Empty, Image, Table, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type BlogType from '../types/Blog';
import type { TableColumnsType } from 'antd';

interface Props {
  data: any,
  handleDelete: (keys:any) => void
}

//table
interface DataType extends BlogType {
  key: number|undefined;
}

const columns: TableColumnsType<BlogType> = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Link to={'/blog-detail/' + record.id}>Edit</Link>
    ),
  },
];

const BlogList:React.FC<Props> = (props: Props) => {
  const {data} = props;
  const {handleDelete} = props;
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');

  data.map((obj:DataType, index:number) => {
    obj.key = obj.id;
  });

  let [deleteKeys, setDeleteKeys] = useState<React.Key[]>();
  let [numKey, setNumKey] = useState<number>(0);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: BlogType[]) => {
      setDeleteKeys(selectedRowKeys);
      setNumKey(selectedRowKeys.length);
    },
  };

  //pop confirm delete handle
  const confirm = (e: any) => {
    if(numKey > 0){
      let isSuccess:any = handleDelete(deleteKeys);
      if(isSuccess){
        message.success('Success!');
      }
    }
    else{
      message.error('Please choose at least 1 blog!');
    }
  };

  const cancel = (e: any) => {
  };

  return (
    <div>
      <Popconfirm
        title="Delete blog"
        description="Are you sure to delete?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<DeleteOutlined />} danger style={{marginBottom: '10px'}}></Button>
      </Popconfirm>
      &nbsp;
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default BlogList;
