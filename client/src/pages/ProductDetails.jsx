import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './../components/layout/Layout';
import Details from '../components/product/Details';
import Brands from './../components/product/Brands';
import useProductStore from '../store/useProductStore';

const ProductDetails = () => {

    const {brandList, fetchDetails, fetchReviews, fetchBrands} = useProductStore();
    const { productID } = useParams();

    useEffect(() => {
        (async () => {
            try {
                await fetchDetails(productID);
                await fetchReviews(productID);
                brandList===null? await fetchBrands(): null;
            } catch (error) {
                console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <Details/>
            <Brands/>
        </Layout>
    );
};

export default ProductDetails;