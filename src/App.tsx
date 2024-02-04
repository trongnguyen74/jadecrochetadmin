import React from 'react';
import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

import Home from "./pages/Home";
import ProductList from "./pages/product/List";
import ProductCreate from "./pages/product/Create";
import ProductDetail from "./pages/product/Detail";
import BlogList from "./pages/blog/List";
import BlogDetail from "./pages/blog/Detail";
import BlogCreate from "./pages/blog/Create";

function App() {
  const {Content, Footer, Sider } = Layout;
  const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: 'Product',
      key: 'product',
      children: [
        {
          label: 'View products',
          key: 'productList',
          onClick: () => {navigate('/product-list')}
        },
        {
          label: 'Add product',
          key: 'addProduct',
          onClick: () => {navigate('/add-product')}
        },
      ],
    },
    {
      label: 'Blog',
      key: 'blog',
      children: [
        {
          label: 'View blogs',
          key: 'blogList',
          onClick: () => {navigate('/blog-list')}
        },
        {
          label: 'Add blog',
          key: 'addBlog',
          onClick: () => {navigate('/add-blog')}
        },
      ],
    },
  ];

  return (
    <Layout className="layout">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={items} selectable={false}/>
      </Sider>
      <Layout>
        <Content className="layout-content">
          <div
            style={{
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/add-product" element={<ProductCreate />} />
              <Route path="/blog-list" element={<BlogList />} />
              <Route path="/blog-detail/:id" element={<BlogDetail />} />
              <Route path="/add-blog" element={<BlogCreate />} />
            </Routes>
          </div>
        </Content>
        <Footer className="layout-footer">
          ©{new Date().getFullYear()} Jade Crochet
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
