import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";
import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../action/authActions';
import { loadUser } from '../../action/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Avatar from '../Avatar';
import logoEasy from "../../assest/images/logoEasy.png"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [collapse, setcollapse] = useState(false)
    const [currentDateTime, setcurrentDateTime] = useState(new Date().toLocaleDateString())
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const showSidebar = () => setSidebar(!sidebar);
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        if (auth?.user?.role !== 'Admin') {
            dispatch(loadUser(auth));
        }
        // var today = new Date();

        // setcurrentDateTime (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
    }, []);
    const onToggleCollapse = () => {
        setcollapse(!collapse)
    }
    return (
        <>
            <input type="checkbox" id="sidebar-toggle" />
            <div className="sidebar">
                <div className="brand">

                    <img src={logoEasy} />
                </div>


                <div className="sidebar-menu">
                    <ul>

                        <li style={{ padding: "0 2rem" }} >
                            <a href="/">
                                <span className="ti-home icons"></span>
                                <span className="label-side-bar" >Dashboard</span>
                            </a>
                        </li>

                        <li style={{ padding: "0 2rem" }}>


                            <i className="far fa-box icons"></i>
                            <Link to="/users/allUsers">
                                <span className="label-side-bar">Utilisateurs</span>
                            </Link>
                        </li>
                        <li style={{ padding: "0 2rem" }}>


                            <i className="far fa-box icons"></i>
                            <Link to="/products/allProduct">
                                <span className="label-side-bar">Produits</span>
                            </Link>
                        </li>
                        <li style={{ padding: "0 2rem" }}>
                            <i className="fal fa-file-invoice icons"></i>

                            <Link to="/facture/allFacture">
                                <span className="label-side-bar">Factures</span>
                            </Link>


                        </li>

                        <li style={{ padding: "0 2rem" }}>
                            <Link to="/products/salePage"> <span className="ti-clipboard icons"></span>
                                <span className="label-side-bar">Ventes</span></Link>

                        </li>

                        <li className="logout" >
                            <div onClick={() => dispatch(logoutUser())}>
                                <i className="fal fa-power-off power"></i>
                            </div>
                        </li>



                    </ul>
                </div>
            </div>


            <div className="main-content">

                <header>
                    <label htmlFor="sidebar-toggle" className="ti-menu-alt"></label>

                    <div className='part-right-header'  >
                        <span className="date" >{currentDateTime} </span>
                        <div className="social-icons">
                            <span className="ti-bell"></span>


                        </div>
                        <div className='header-part-profile' >

                            <span className="compte-name"  >Bonjour, {user?.firstname} </span>
                            <Avatar
                                width="50"
                                height="50"

                            />

                            <i className="far fa-ellipsis-v three-pt" onClick={onToggleCollapse} ></i>
                            {collapse === true ? (
                                <div className="dropdown-profil">
                                    <div className="dp-profil-item">
                                        <i class="fal fa-user"></i>
                                        <Link to='/profile' > <span>Profil</span></Link>

                                    </div>
                                    <div className="dp-profil-item">
                                        <i class="fal fa-calendar-alt"></i>
                                        <span>Calendrier</span>
                                    </div>
                                    <div className="dp-profil-item">
                                        <i class="fal fa-sliders-v"></i>
                                        <span>Paramètre</span>
                                    </div>
                                    <hr className="ligne-log" />
                                    <div className="dp-profil-item" onClick={() => dispatch(logoutUser())}>
                                        <i className="fal fa-power-off power-dropdown"></i>
                                        <span>Déconnexion</span>
                                    </div>




                                </div>
                            ) : null

                            }

                        </div>

                    </div>
                </header>

            </div>
            {/* <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <button
                onClick={() => dispatch(logoutUser())}
                color='inherit'
                component={Link}
                to=''
              >
                Logout
              </button>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
           
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider> */}
        </>
    );
}

export default hot(Navbar);