import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "../../actions";
import { updateOrder } from "../../actions/order.action";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";
import { generatePublicUrl } from "../../urlConfig";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import "./style.css";

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);
  const params = useParams();

  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type: "canceled",
    };
    dispatch(updateOrder(payload));
    window.location.reload(true);
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };
  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | OrderDetails</title>
        <meta
          name="description"
          content="Order Details page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/order_details"}>
        Order Detail
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <Breadcrumb />

        <div
          style={{
            width: "1160px",
            margin: "10px auto",
          }}
        >
          <Card
            style={{
              margin: "10px 0",
            }}
          >
            <div className="delAdrContainer">
              <div className="delAdrDetails">
                <div className="delTitle">Delivery Address</div>
                <div className="delName">{orderDetails.address.name}</div>
                <div className="delAddress">{orderDetails.address.address}</div>
                <div className="delPhoneNumber">
                  Phone number {orderDetails.address.mobileNumber}
                </div>
              </div>
              <div className="delMoreActionContainer">
                <div className="delTitle">More Actions</div>
                <div className="delName">Download Invoice</div>
              </div>
            </div>
          </Card>
          {orderDetails.items.map((item, index) => (
            <Card
              style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
            >
              <div className="flexRow" style={{ display: "flex" }}>
                <div className="delItemImgContainer">
                  <img
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                    alt="anh"
                  />
                </div>
                <div style={{ width: "250px" }}>
                  <div className="delItemName">{item.productId.name}</div>
                  <Price value={item.payablePrice} />
                </div>
              </div>
              <div style={{ padding: "25px 50px" }}>
                <div className="orderTrack">
                  {orderDetails.orderStatus.map((status) => (
                    <div
                      className={`orderStatus ${
                        status.isCompleted ? "active" : ""
                      }`}
                    >
                      <div
                        className={`point ${
                          status.isCompleted ? "active" : ""
                        }`}
                      ></div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontWeight: "500", fontSize: 14 }}>
                {orderDetails.orderStatus[3].isCompleted &&
                  `Delivered on ${formatDate2(
                    orderDetails.orderStatus[3].date
                  )}`}
              </div>
            </Card>
          ))}
          <div className="cart-shiping-update-wrapper">
            <div className="cart-shiping-update">
              {/* <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                Continue Shopping
              </Link> */}
            </div>
            <div className="cart-clear">
              <button onClick={() => onOrderUpdate(orderDetails._id)}>
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderDetailsPage;
