import React, { useEffect, Fragment } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import { Breed } from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import { generatePublicUrl } from "../../urlConfig";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import "./style.css";
/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const getOrderStatus = (orderStatus) => {
    let type = "ordered";
    for (const status of orderStatus) {
      if (status.isCompleted) {
        type = status.type;
      }
    }
    return type;
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Orders</title>
        <meta
          name="description"
          content="Order page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/account/orders"}>
        Orders
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <Breadcrumb />

        <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
          {/* <Breed
            breed={[
              { name: "Home", href: "/" },
              { name: "My Account", href: "/account" },
              { name: "My Orders", href: "/account/orders" },
            ]}
            breedIcon={<IoIosArrowForward />}
          /> */}
          {user.orders.map((order) => {
            return order.items.map((item) => (
              <Card style={{ margin: "5px 0" }}>
                <Link
                  to={`/order_details/${order._id}`}
                  className="orderItemContainer"
                >
                  <div className="orderImgContainer">
                    <img
                      className="orderImg"
                      src={generatePublicUrl(
                        item.productId.productPictures[0].img
                      )}
                    />
                  </div>
                  <div className="orderRow">
                    <div className="orderName">{item.productId.name}</div>
                    <div className="orderPrice">VNĐ {item.payablePrice}</div>
                    <div>{getOrderStatus(order.orderStatus)}</div>
                  </div>
                </Link>
              </Card>
            ));
          })}
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderPage;
