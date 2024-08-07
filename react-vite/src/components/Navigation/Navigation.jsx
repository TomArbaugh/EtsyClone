import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton"; 
import LoginFormModal from "../LoginFormModal"; 
import "./Navigation.css";
import { CgShoppingCart } from "react-icons/cg";
// import etsyLogo from '/../images/Etsy-Logo.png';


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='header-container'>
      <div id='logo'>
        <NavLink className='logo-link-to-home' to='/'>
        {/* <img src={etsyLogo} alt='Etsy Logo' className='etsy-logo' />  */}
        <h2 className='getsy-logo' alt='Etsy Logo'>Getsy</h2>
        </NavLink>  
      </div>
      
      <div className='category-and-search'>
        {/* <div id='header-category'>Category</div>

        <div id='search-bar'>
          <input 
            type="text"
            placeholder='Search for anything'/>
        </div> */}
      </div>
      
      <div className='two-icons'>
        <div id='login-and-signup'>
          <ProfileButton user={sessionUser}/>
        </div>
        
        <div id='shopping-cart-icon'>
          {sessionUser ? (
            <NavLink to='/cart'>
              <CgShoppingCart />
            </NavLink>
          ) : (
            <OpenModalButton
              buttonText={<CgShoppingCart />}
              modalComponent={<LoginFormModal />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
