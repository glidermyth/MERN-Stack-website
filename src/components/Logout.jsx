import React,{useEffect,useContext} from 'react';
import {useHistory} from "react-router-dom";
import { UserContext } from '../App';

function Logout(){

    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    useEffect(
        ()=>{
        fetch("/signout",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            },
            credentials:"include"
        })
        .then((res)=>{
            console.log(res);
            if(res.status === 200){
                dispatch({type:"USER",payload:false});
                window.alert("User Logout successfully");
                history.push("/");
            }
            else if(res.status === 400){
                window.alert("Something went wrong");
            }
        })
    },[]
    )

    return(
        <>
            <div className="logoutPageBody">
                <div className="loader"></div>
            </div>
        </>
    );
}


export default Logout;