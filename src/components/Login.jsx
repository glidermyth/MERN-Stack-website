import React,{useContext, useState} from 'react';
import loginImage from '../images/loginPageImage.png';
import {NavLink,useHistory} from 'react-router-dom';
import { UserContext } from '../App';


function Login(){

    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    

    const postSigninData = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("/signin",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({email,password})
            });
            const data = await response.json();
            if(data.message === "fields cannot be empty"){
                window.alert("Fields cannot be empty");
            }
            else if(data.message === "User login successful"){
                dispatch({type:"USER",payload:true});
                window.alert("User login successful");
                history.push("/");
            }
            else if(data.message === "invalid credential"){
                window.alert("invalid credential");
            }
            else if(data.message === "user not registered"){
                window.alert("user not registered");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <div className="mainLoginBody">
            <div className="loginBody">
                <img src={loginImage} alt="LoginImage" />
                <form method="post" className="loginForm">
                    <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email"/>
                    <input type="password" name="password"value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="password"/>
                    <input type="submit" name="submit" onClick={postSigninData} value="Login" id="loginbtn"/>
                </form>
                <NavLink className="clickHereLogin" to="/signup">Create Account,Click here</NavLink>
            </div>
            {/* <div className="circleOneLoginPage"></div> */}
            {/* <div className="circleTwoLoginPage"></div> */}
        </div>
        </>
    );
}


export default Login;