import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkUpdateProducts } from '../../redux/products';
import './UpdateProductForm.css';

const UpdateProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.productDetails[productId]);
  console.log('what is the product', product)
  
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  // const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errorArr = [];
    if (!name) errorArr.push('Name is required');
    if (name.length > 50) errorArr.push('Name cannot be more than 50 characters');
    if (!category) errorArr.push('Category is required');
    if (category.length > 50) errorArr.push('Category cannot be more than 50 characters');
    if (!description) errorArr.push('Description is required');
    if (description.length > 255) errorArr.push('Description cannot be more than 255 characters');
    if (!price) errorArr.push('Price is required');
    if (price <= 0) errorArr.push('Price must be a positive number');
    if (!stock) errorArr.push('Stock is required');
    if (stock <= 0) errorArr.push('Stock must be a positive number');
    setErrors(errorArr);
  }, [name, category, description, price, stock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const updatedProduct = { ...product, name, category, description, price, stock};

    const response = await dispatch(thunkUpdateProducts(updatedProduct));

    if (response.errors) {
      console.log('Updated Product Errors:', response.errors);
      setErrors(response.errors);
    } else {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <form className='products-form' onSubmit={handleSubmit}>
      <p>Update your product details below.</p>
      {hasSubmitted && errors.length > 0 && (
        <div className="error-list">
          {Array.isArray(errors) && errors.map((error, idx) => (
            <p key={idx} className="error">{error}</p>
          ))}
        </div>
      )}
      <label>
        Name *
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {hasSubmitted && Array.isArray(errors) && errors.includes('Name is required') && <p className="error">Name is required</p>}
        {hasSubmitted && Array.isArray(errors) && errors.includes('Name cannot be more than 50 characters') && <p className="error">Name cannot be more than 50 characters</p>}
      </label>
      <label>
        Category *
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        {hasSubmitted && Array.isArray(errors) && errors.includes('Category is required') && <p className="error">Category is required</p>}
        {hasSubmitted && Array.isArray(errors) && errors.includes('Category cannot be more than 50 characters') && <p className="error">Category cannot be more than 50 characters</p>}
      </label>
      {/* <label>
        Photos and video *
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label> */}
      <label>
        Description *
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {hasSubmitted && Array.isArray(errors) && errors.includes('Description is required') && <p className="error">Description is required</p>}
        {hasSubmitted && Array.isArray(errors) && errors.includes('Description cannot be more than 255 characters') && <p className="error">Description cannot be more than 255 characters</p>}
      </label>
      <h2>Price & Inventory</h2>
      <label>
        Price *
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {hasSubmitted && Array.isArray(errors) && errors.includes('Price is required') && <p className="error">Price is required</p>}
        {hasSubmitted && Array.isArray(errors) && errors.includes('Price must be a positive number') && <p className="error">Price must be a positive number</p>}
      </label>
      <label>
        Stock *
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        {hasSubmitted && Array.isArray(errors) && errors.includes('Stock is required') && <p className="error">Stock is required</p>}
        {hasSubmitted && Array.isArray(errors) && errors.includes('Stock must be a positive number') && <p className="error">Stock must be a positive number</p>}
      </label>
      <button type="submit">Update listing</button>
    </form>
  );
};

export default UpdateProductForm;
