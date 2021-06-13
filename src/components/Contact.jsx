import React,{useEffect,useState} from 'react';


function Contact(){

    const [message,setMessage] = useState("");
    const [userData,setUserData] = useState({});
    let data;
    const contactPage = async ()=>{
        const response = await fetch("/contactData",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "content-type":"application/json"
            },
            credentials:'include'
        });
        
        // console.log(response.status);
        // console.log(data);
        // if(data){
            //     console.log(data);
            // }
            // else{
                //     history.push("/login");
                // }
                if(response.status === 401){
                    console.log(response.status);
                }
                else{
                    data = await response.json();
                    setUserData(data);
                }
                
            }
            
            useEffect(() =>{
                contactPage();
            },[]);
            
            const sendMessageData = async () =>{
                const email = userData.email;
                const res = await fetch("/contactDataPost",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({email,message})
                });
                const data = await res.json();
                if(data.message === "fields cannot be empty"){
                    window.alert("fields cannot be empty");
                }
                else if(data.message === "message sent successfully"){
                    window.alert("message sent successfully");
                }
                else if(data.message === "message sent failed"){
                    window.alert("message sent failed");
                }
                else if(data.message === "user not registered"){
                    window.alert("user not registered");
                }
                
            }
            
            return(
                <>
                <div className="mainContactPageBody">
                    <div className="contactPageBodeOne">
                        <div className="contactPageInputField">
                            <input type="text" name="fullname" placeholder="Fullname" value={userData.name}/>
                        </div>
                        <div className="contactPageInputField">
                            <input type="text" name="mobile" placeholder="Mobile" value={userData.mobile}/>
                        </div>
                        <div className="contactPageInputField">
                            <input type="text" name="occupation" placeholder="Occupation" value={userData.occupation}/>
                        </div>
                        
                    </div>
                    <div className="contactPageBodeTwo">
                        <div className="contactPageDescField">
                            <input type="email" name="email" placeholder="Email" value={userData.email}/>
                            <textarea onChange={(e) =>{setMessage(e.target.value)}} value={message} name="description" placeholder="enter your message" cols="40" rows="15">
                            </textarea>
                            <button onClick={sendMessageData}>Send Message</button>
                        </div>
                        
                    </div>
                </div>
            </>
    );
}


export default Contact;