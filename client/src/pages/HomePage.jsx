import React from 'react';
import Layout from './../components/layout/Layout';
import SliderSkeleton from '../skeleton/SliderSkeleton';
import FeaturesSkeleton from '../skeleton/FeaturesSkeleton';
import CategoriesSkeleton from '../skeleton/CategoriesSkeleton';
import ProductsSkeleton from '../skeleton/ProductsSkeleton';
import BrandsSkeleton from '../skeleton/BrandsSkeleton';

const HomePage = () => {
    return (
        <Layout>
            <SliderSkeleton/>
            <FeaturesSkeleton/>
            <CategoriesSkeleton/>
            <ProductsSkeleton/>
            <BrandsSkeleton/>
            
        </Layout>
    );
};

export default HomePage;