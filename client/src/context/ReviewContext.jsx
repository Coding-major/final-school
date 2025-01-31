import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {baseUrl, getRequest, postRequest, postRequestFormData} from '../utils/service';
import {ProductContext} from './ProductContext';

export const ReviewContext = createContext();

export const ReviewContextProvider = ({children}) => {
    const {productId} = useContext(ProductContext);
    
    const [reviewData, setReviewData] = useState({
        product: "",
        rating: 0,
        comment: "",
    });

    const [reviewIsLoading, setReviewIsLoading] = useState(false);
    const [reviewError, setReviewError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [count, setCount] = useState(null);
    const [reviewsIsLoading, setReviewsIsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState(null);

    useEffect(() => {
        setReviews([]);
        setReviewData((prev) => ({
            ...prev,
            product: productId,
        }));
    }, [productId]);

    const reviewInput = (e) => {
        const {name, value} = e.target;
        setReviewData((prev) => ({ ...prev, [name]: value }));
        
        
    }
    const createReview = async (e) => {
        e.preventDefault();
        
        
        setReviewIsLoading(true);
        setReviewError(null);
        const response = await postRequest(`${baseUrl}/reviews`, reviewData);
        setReviewIsLoading(false);

        if (response.error) {
            return setReviewError(response.message);
        }
        
        setReviews((prev) => [response, ...prev]);
    }


    const fetchReviews = async () => {
        setReviews([]);
        setReviewsIsLoading(true);
        setReviewsError(null);
        
        const response = await getRequest(`${baseUrl}/products/${productId}/reviews`);
        setReviewsIsLoading(false);
        if (response.error) {
            return setReviewsError(response.message);
        }
        
        
        setReviews(response.review);
        setCount(response.count);
    }

    // useEffect(() => {   
    //     fetchReviews();
    // }, [productId]);


    return <ReviewContext.Provider value={{
        reviewInput,
        reviewData,
        createReview,
        reviewIsLoading,
        reviewError,
        fetchReviews,
        reviews,
        count,
        reviewsIsLoading,
        reviewsError,
    }}>
        {children}
    </ReviewContext.Provider>;
}