import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetailsById } from '../../actions'
import Layout from '../../components/Layout'

const ProductDetailsPage = (props) => {

    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.product)
    useEffect(() => {
        const payload = {
            params: {
                productId
            }
        }

        dispatch(getProductDetailsById(payload))
    }, [])

  return (
    <Layout>
        <div>{product.productDetails.name}</div>
    </Layout>
  )
}

export default ProductDetailsPage
