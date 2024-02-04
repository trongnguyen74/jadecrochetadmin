import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Empty, Tag, Image } from 'antd';
import formatNumberCommas from '../utilities/NumberWithCommas';

interface Props {
  data: any
}

const ProductList:React.FC<Props> = (props: Props) => {
  const {data} = props;

  return (
    <div>
      <h2>Product list</h2>
      {
        (data.length > 0) ? (
          <table>
            <thead>
              <tr>
                <th align="center"></th>
                <th align="left" className="mobile-tb-col">Name</th>
                <th align="right">Amount</th>
                <th align="right">Price</th>
                <th align="right" className="mobile-tb-col">Discount price</th>
                <th align="center"></th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((row:any, index:number) => {
                  return <tr key={row.id}>
                    <td align="center" className="product-thumnail-list"><Image src={row.images[0].url} /></td>
                    <td align="left" className="mobile-tb-col">{row.name}</td>
                    <td align="right">{row.amount}</td>
                    <td align="right">{formatNumberCommas(row.price)}<sup>VND</sup></td>
                    <td align="right" className="mobile-tb-col">
                      {formatNumberCommas(row.sale_price)}<sup>VND</sup>&nbsp;&nbsp;
                      <Tag color="#f50">-{row.sale_percent.toFixed(0)}%</Tag>
                    </td>
                    <td align="center">
                      <Link to={'/product-detail/' + row.id}>Edit</Link>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        )
        :
        (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
              <span>
                Your product list is empty!
              </span>
            }
          >
            <Button type="primary"><Link to="/add-product">Add Product Now</Link></Button>
          </Empty>
        )
      }
    </div>
  )
}

export default ProductList;
