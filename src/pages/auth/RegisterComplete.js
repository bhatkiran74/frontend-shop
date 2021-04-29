import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'

import { toast } from 'react-toastify';



const RegisterComplete = ({ history }) => {


    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")




    useEffect(() => {

        setemail(window.localStorage.getItem("emailForRegistration"))

    }, [])

    const handleSubmit = async (e) => {

        //
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password is required");
        }
        if (password.length < 6) {
            toast.error("password length must be atleast 6 charecters");
        }



        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);

            console.log("result : ", result);


            if (result.user.emailVerified) {
                //erase mail from localstrorage 
                window.localStorage.removeItem("emailForRegistration");
                //take user data from firebase
                let user = auth.currentUser;
                //update password
                await user.updatePassword(password);
                //take tocken
                const idTokenResult = await user.getIdTokenResult();

                //set redux

                console.log("user " + user + " token :" + idTokenResult);

                //home page var push kara
                history.push('/')
            }
        }
        catch (err) {
            toast.error(err.message);
        }


    }


    const completeRegistrationForm = () =>
        <form onSubmit={handleSubmit}>

            <input className="form-control" type="email" value={email} disabled />
            <input className="form-control" type="password" value={password} onChange={(e) => setpassword(e.target.value)} autoFocus placeholder="password" />
            <button type="submit" className="btn btn-raised">Register</button>

        </form>


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Complete Registration</h1>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete


