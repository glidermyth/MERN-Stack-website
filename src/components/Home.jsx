import React,{useContext,useEffect,useState} from 'react';
import {NavLink} from 'react-router-dom';
import { UserContext } from '../App';


function Home(){

    const [userData,setUserData] = useState({});
    let data;
    const aboutUsPage = async ()=>{
            const response = await fetch("/aboutData",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "content-type":"application/json"
                },
                credentials:'include'
            });

            console.log(response.status);
                data = await response.json();
                setUserData(data);
    }
            

    useEffect(() =>{
        aboutUsPage();
    },[]);
    const {state} = useContext(UserContext);
    function HomeRenderMenu(){
            if(state){
                return(
                <div class="homeBodyInfo2">
                        {/* <h1>Hello World!</h1> */}
                        <h1>Hello {userData.name}</h1>
                        <h3>
                        <p>Happy to see you back :) </p>
                        </h3>
                </div>
                )
            }else{
                return(
                    <div class="homeBodyInfo">
                        <h1>Hello World!</h1>
                        <h1>We Are Awesome DeVeLoPeRs</h1>
                        <h3>
                        <p>A Journey Of Thousand Light Years </p>
                        <p>  Start With A Single Step.</p>  
                        <p>Let's take your first step and hit the <NavLink to="/signup"><button id="homeRegisterBtn">Register</button></NavLink>
                        </p>
                        </h3>
                        <span>
                            <p>
                                Join the amazing journey of
                                developing tech products.
                            </p>
                            <p>
                                People don't care about what you say, 
                                they care about what you build.-- Mark Zuckerberg
                            </p>
                        </span>
                    </div>
                )
            }
    }

    return(
        <>
            <div className="homeMainBody">
                <div className="homeBody">
                    <div className="homeDivLeft"></div>
                    <div className="homeDivRight"></div>
                    <HomeRenderMenu/>
                </div>
            </div>
        </>
    );
}

export default Home;