import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetCurrentUsersProducts } from '../../redux/products';
import './YourListings.css';
import OpenModalButton from '../OpenModalButton';
import DeleteProductModal from './DeleteProductModal';
import { Link } from "react-router-dom";


const YourListings = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const products = useSelector((state) => state.products.allProducts);


 useEffect(() => {
   dispatch(thunkGetCurrentUsersProducts());
 }, [dispatch]);


 const handleAddListing = () => {
   navigate('/products/new');
 };


  console.log("Products in YourListings:", products); // log the products to check if image_url is present


 return (
   <div className="your-listings-page">
     <div className="your-listings-header">
       <h1>Your Listings</h1>
       <button className="add-listing-button" onClick={handleAddListing}>
         + Add a listing
       </button>
     </div>
     <div className="your-listings-content">
       {products.length === 0 ? (
         <p>No listings found.</p>
       ) : (
         <div>
           {products.map((product) => (
             product && (
               <div key={product.id} className="listing-item">
                 <img src={product.image_url} alt={product.name} className='product-card-img' />
                 <div className="listing-details">
                   <h2>{product.title}</h2>
                   <p>${product.price}</p>
                   <p>{product.quantity} in stock</p>
                   <p>{product.category}</p>
                   <p>{product.description}</p>
                   <div className="listing-actions">
                     <Link to={`/products/${product.id}/edit`}>
                       <button>Edit</button>
                     </Link>
                     <OpenModalButton
                       buttonText='Delete'
                       modalComponent={<DeleteProductModal productId={product.id} />}
                     />
                   </div>
                 </div>
               </div>
             )
           ))}
         </div>
       )}
     </div>
   </div>
 );
};


export default YourListings;