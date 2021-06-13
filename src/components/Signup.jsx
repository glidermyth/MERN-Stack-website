import React,{useState} from 'react';
import signUpImage from '../images/signupPageImage.png'
import {NavLink,useHistory} from 'react-router-dom';


function Signup(){

    const history = useHistory();
    const [user,setUser] = useState({
        name:"",
        email:"",
        mobile:"",
        ocupation:"",
        password:"",
        cpassword:"",
    });
    const postData = async (e) =>{
        e.preventDefault();
        const {name,email,mobile,occupation,password,cpassword} = user;
        const response = await fetch("/register",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name,email,mobile,occupation,password,cpassword
            })
        });
        const data = await response.json();
        console.log(data);
        if(data.message === "Fields cannot be empty"){
            window.alert("Fields cannot be empty");
        }
        else if(data.message === "User already exist,Please Register"){
            window.alert("User already exist,Please Register");
            
        }
        else if(data.message === "user registered successfully"){
            window.alert("user registered successfully");
            history.push("/login");
        }
        else{
            window.alert("user registration failed");
        }
    }

    const inputHandler = (e)=>{
        // console.log(e);
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user, [name]:value})
    }

    return(
        <>
        <div className="mainSignUpDiv">
            <div className="signupBody">
                <img src={signUpImage} alt="signUpImage"/>
                <form method="post" className="signupForm">
                    <input type="text" name="name" value={user.name} onChange={inputHandler} placeholder="Fullname"/>
                    <input type="email" name="email" value={user.email} onChange={inputHandler} placeholder="Email"/>
                    <input type="text" name="mobile" value={user.mobile} onChange={inputHandler} placeholder="Mobile"/>
                    <input type="text" name="occupation" value={user.occupation} onChange={inputHandler} placeholder="Ocupation"/>
                    <input type="password" name="password" value={user.password} onChange={inputHandler} placeholder="Password"/>
                    <input type="password" name="cpassword" value={user.cpassword} onChange={inputHandler} placeholder="Confirm Password"/>
                    <input type="submit" name="submit" onClick={postData} value="Register" id="signupbtn"/>
                </form>
                <NavLink className="clickHereSignup" to="/login">If you Already Have an account,Click Here</NavLink>
            </div>
            {/* <div className="circleOneSignUpPage"></div>
            <div className="circleTwoSignUpPage"></div> */}
        </div>
        </>
    );
}


export default Signup;