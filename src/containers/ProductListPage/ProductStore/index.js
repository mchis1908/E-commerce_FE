import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import { MaterialButton } from "../../../components/MaterialUI";

/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  // const [priceRange, setPriceRange] = useState({
  //   under2000k: 2,
  //   under5000k: 5,
  //   under10000k: 10,
  //   under15000k: 15,
  //   under20000k: 20,
  //   under30000k: 30,
  //   under50000k: 50,
  // });
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  // Code khác trong video do làm như video không còn được hỗ trợ
  useEffect(() => {
    console.log(window.location);
    dispatch(getProductsBySlug(window.location.pathname));
  }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${window.location.pathname} dưới ${priceRange[key]} triệu`}
            headerRight={
              <MaterialButton
                title={"XEM TẤT CẢ"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{
                    display: "block",
                  }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "10px 0" }}>{product.name}</div>
                    <div>
                      <Rating value="4.3" />
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        (3353)
                      </span>
                    </div>
                    <Price value={product.price} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductStore;
