import React from 'react';
import useReviewStore from '../../store/useReviewStore';

const ReviewSubmitButton = (props) => {
    let {isReviewSubmit}=useReviewStore();
    if(isReviewSubmit===false){
        return  <button onClick={props.onClick} type="submit" className={props.className}>{props.text}</button>
    }else {
        return (
            <button disabled={true} className={props.className}><div className="spinner-border spinner-border-sm" role="status"></div>Processing...</button>
        );
    }
};
export default ReviewSubmitButton;