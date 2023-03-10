import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { UseStateValue } from "./StateProvider";
import {auth} from '../firebase'
function Header() {
  const [{basket, user}, dispatch] = UseStateValue();
  const handleClick = () => {
    if(user){
      auth.signOut()
    }
  }
  return (
    <div className="header">
      <div className="header_logo">
        <Link to="/">
          <img
            className="header_logo_img"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </Link>
      </div>
      <div className="header_search">
        <input type="text" className="header_search_input" />
        <SearchIcon className="header_search_icon" />
      </div>
      <div className="header_options">
        <Link to={!user && '/login'}>
        <div onClick={handleClick} className="header_option">
          <span className="header_optionOne">Hello</span>
          <span className="header_optionTwo">{user ? 'Sign-Out' : 'Sign-In'}</span>
        </div> 
        </Link>
        <Link to='/orders'>
        <div className="header_option">
          <span className="header_optionOne">Return</span>
          <span className="header_optionTwo">& orders</span>
        </div>
        </Link>
        
        <div className="header_option">
          <span className="header_optionOne">Your</span>
          <span className="header_optionTwo">Prime</span>
        </div>
      </div>
      <Link to="/checkout">
        <div className="header_option_basket">
          <ShoppingBasketIcon className="header_basket_icon" />
          <span className="header_basket_count">{basket?.length}</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
