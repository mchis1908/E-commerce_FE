import React from "react";
import Layout from "../../components/Layout";
import getParams from "../../utils/getParams";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";
import "./style.css";

const ProductListPage = (props) => {
  const renderProdcut = () => {
    console.log(window.location.search);
    const params = getParams(window.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
    }
    return content;
  };
  return <Layout>{renderProdcut()}</Layout>;
};

export default ProductListPage;
