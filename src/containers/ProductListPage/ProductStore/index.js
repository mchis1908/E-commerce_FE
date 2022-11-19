import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";

/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under2000k: 2,
    under5000k: 5,
    under10000k: 10,
    under15000k: 15,
    under20000k: 20,
    under30000k: 30,
    under50000k: 50,
  });
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
          <div className="card">
            <div className="cardHeader">
              <div>
                {window.location.pathname} dưới {priceRange[key]} triệu
              </div>
              <button>Xem tất cả</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link 
                to={`/${product.slug}/${product._id}/p`}
                style={{
                  display: 'block'
                }} className="productContainer">
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.5</span>&nbsp;
                      <span>3353</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductStore;
