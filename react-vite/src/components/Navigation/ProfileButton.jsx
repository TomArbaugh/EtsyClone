import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { LuClipboardList } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import './ProfileButton.css'; 

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/');
    closeMenu();
  };

  // const handleLink = (event, url) => {
  //   event.preventDefault();
  //   window.location.href = url;
  //   window.location.reload();
  // }
  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <div className="profile-dropdown" ref={ulRef}>
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <hr className="divider" /> {/* Horizontal divider line */}
            {/* <p><Link id='manage your listing' to='your-listings'>Your listing</Link></p> */}
            <p>
              {/* <a href='/orders/view' onClick={handleLink(event,'/orders/view')}>View Orders</a> */}
              <Link to='/orders/view' className='profile-link'>
                  <IoMdCard className='link-icon' /> Your Orders
                </Link>
              <Link to='/your-listings' className='profile-link'>
                  <LuClipboardList className='link-icon' /> Your Listings
              </Link>
            </p>
            <hr className="divider" /> {/* Horizontal divider line */}
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
      )}
    </div>
  );
}

export default ProfileButton;
