import React,{useEffect,useState} from 'react';
import {useHistory} from "react-router-dom";
import aboutPageProfilePic from "../images/aboutPageProfilePic.png";


function About(){

    const [userData,setUserData] = useState({});
    let data;
    const history = useHistory();
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
            // console.log(data);
            // if(data){
            //     console.log(data);
            // }
            // else{
            //     history.push("/login");
            // }
            if(response.status === 401){
                    history.push("/login");
            }
            else{
                data = await response.json();
                setUserData(data);
            }
            
    }

    useEffect(() =>{
        aboutUsPage();
    },[]);

    return(
        <>
            <div className="mainAboutPageBody">
                <div className="mainAboutPage">
                    <div className="aboutPageDivOne">
                        <div className="aboutPageProfilePic">
                            <img src={aboutPageProfilePic} alt="aboutpageprofilepic"/>
                        </div>
                        <div className="usefullLinks">

                        </div>
                    </div>
                    <div className="aboutPageDivTwo">
                        <div className="displayDataFields">
                            <label htmlFor="name">NAME:</label>
                            <span className="dataField">{userData.name}</span>
                        </div>
                        <div className="displayDataFields">
                            <label htmlFor="name">EMAIL:</label>
                            <span className="dataField">{userData.email}</span>
                        </div>
                        <div className="displayDataFields">
                            <label htmlFor="name">MOBILE:</label>
                            <span className="dataField">{userData.mobile}</span>
                        </div>
                        <div className="displayDataFields">
                            <label htmlFor="name">OCCUPATION:</label>
                            <span className="dataField">{userData.occupation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default About;