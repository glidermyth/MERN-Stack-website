import React,{useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { UserContext } from '../App';



function Navbar(){
    const {state} = useContext(UserContext);
    const RenderMenu = () =>{
        if(state){
            return(
                <>
                <div className="links">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/logout">LogOut</NavLink></li>
                        </ul>
                    </div>
                </>
            )
        }else{
            return(
                <>
                <div className="links">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/signup">SignUp</NavLink></li>
                        </ul>
                    </div>
                </>
            )
        }
    }
    return(
        <>
            <div className="navbarBody">
                <div className="navbar">
                    <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-code" viewBox="0 0 16 16">
                        <path d="M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                    </svg>
                        <h2>Awesome DEV</h2>
                    </div>
                    <RenderMenu/>
                </div>
            </div>
        </>
    );
}

export default Navbar;