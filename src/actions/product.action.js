import axios from '../helpers/axios';
import { productContants } from './constants';

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productContants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        }
        else {

        }
    }
}