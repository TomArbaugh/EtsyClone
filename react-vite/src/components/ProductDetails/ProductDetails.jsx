import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { thunkProductDetails } from '../../redux/products';
import { addItemToCart } from '../../redux/cart';
import './ProductDetails.css';
import { getReviewsByProductId } from '../../redux/reviews';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';


const ProductDetails = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();

  const product = useSelector((state) => state.products.productDetails);

  const [quantity, setQuantity] = useState(1);
  const [AddToCardMessage, setAddToCartMessage] = useState('');


  const reviews = useSelector((state) => state.reviews.reviews)




  useEffect(() => {
    dispatch(thunkProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getReviewsByProductId(productId))
  }, [dispatch, productId])

  const handleAddToCart = async() => {
    const result = await dispatch(addItemToCart(productId, quantity));
    if (!result.errors) {
      setAddToCartMessage('Item added to cart!');
    } else {
      setAddToCartMessage('Failed to add item to cart.');
    }  
    setTimeout(() => {
      setAddToCartMessage('');
    }, 2000); 
  };
 





 const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : '';



  return (
   <div className="product-details">
     <div className="top-detail">
       <div className="left-div-image-container">
         {imageUrl ? (
           <img src={imageUrl} alt={product.name} />
         ) : (
           <div className="placeholder-image">{product.name}</div>
         )}
       </div>
       <div className="right-div-product-description">
         <p>${product.price}</p>
         <p>{product.name}</p>
         <p>{product.description}</p>
         <label htmlFor="quantity">Quantity</label>
         <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
         </select>
         <button className="add-to-cart-button" onClick={handleAddToCart}>Add to cart</button>
         {AddToCardMessage && <p className="confirmation-message">{AddToCardMessage}</p>}
         <div className="bottom-reviews">
          <h2>Reviews</h2>
       {reviews ? reviews.map((review) => (
         <>
         <li key={review.product_id}>{review.review}</li>
         <li>{review.stars}</li>
         </>


       )) : null}
       <div id="button-container">
       <div className='button-pad'>
       <Link to={`/products/${product.id}/create-review`}>Create Review</Link>
       </div>
       <div className='button-pad'>
       <Link to={`/products/${product.id}/edit-review`}>Edit Review</Link>
       </div>
       <div className='button-pad'>
       <OpenModalButton 
       buttonText='Delete Review'
       modalComponent={<DeleteReviewModal  productId={product.id}/>}
       />
       </div>
       </div>
  
     </div>
       </div>
     </div>
    </div>
 );
};


export default ProductDetails;