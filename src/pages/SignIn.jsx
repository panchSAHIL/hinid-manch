import React from 'react'
import * as Components from './Components';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function SignIn() {
    const [signIn, toggle] = React.useState(true);
    const navigate = useNavigate(); 
    const { setUserData } = useContext(UserContext);
     
     async function doSignIn(e){
        e.preventDefault();
        const email = document.querySelector("#signInEmail").value;
        const pass = document.querySelector("#signInPass").value;

        const data = {
            email: email,
            password: pass
        };
        
        const response = await fetch("http://localhost:5500/login",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.ok){
            const result = await response.json();

            if(result.status === "success"){
                console.log("Logged in");
                setUserData(data);
                navigate("/home");
            }else if(result.status === "error"){
                console.log("Database error");
            }else{
                console.log("User not found");
            }

        }else{
            console.log("Error making request")
        }
     }

     async function doSignUp(){
        const email = document.querySelector("#signUpEmail").value;
        const pass = document.querySelector("#signUpPass").value;
        const name = document.querySelector("#signUpName").value;

        const data = {
            email: email,
            password: pass,
            name: name
        };

        const response = await fetch("http://localhost:5500/signup",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.ok){
            console.log("User added");
        }else{
            console.log("Error making adding user request");
        }
     }

  return (
    <>
        <Components.Container>
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Create Account</Components.Title>
                      <Components.Input type='text' placeholder='Name' id='signUpName'/>
                      <Components.Input type='email' placeholder='Email' id='signUpEmail' />
                      <Components.Input type='password' placeholder='Password' id='signUpPass'/>
                      <Components.Button onClick={doSignUp}>Sign Up</Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form>
                       <Components.Title>Sign in</Components.Title>
                       <Components.Input type='email' placeholder='Email' id="signInEmail" />
                       <Components.Input type='password' placeholder='Password' id="signInPass" />
                       {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
                       <Components.Button onClick={doSignIn}>Sign In</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>

          </Components.Container>
    </>
  )
}
