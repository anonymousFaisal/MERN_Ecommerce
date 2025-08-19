import React from 'react';
import useProductStore from "../../store/useProductStore";
import CategoriesSkeleton from './../../skeleton/CategoriesSkeleton';

const Categories = () => {
    const {categoryList} = useProductStore();
    
    if (categoryList === null) {
        return <CategoriesSkeleton/>;
    } else {
        return <div></div>;
    }
};

export default Categories;