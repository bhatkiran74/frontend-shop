import React, { useState } from 'react'
import { auth, googleAuthProvider } from '../../firebase'

import { toast } from 'react-toastify';



const Register = () => {


    const [email, setemail] = useState("")


    const handleSubmit = async (e) => {

        //
        e.preventDefault();

        console.log("env ->>>", process.env.REACT_APP_REDIRECT_URL);
        const config = {
            url: process.env.REACT_APP_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email, config);

        toast.success(`Confirmation link send to this ${email} account. click on link for confirmation `)


        window.localStorage.setItem("emailForRegistration", email);

        setemail("");

    }


    const registerForm = () =>
        <form onSubmit={handleSubmit}>

            <input className="form-control" type="email" value={email} onChange={(e) => setemail(e.target.value)} />
            <button type="submit" className="btn btn-raised">Register</button>

        </form>


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Register</h1>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register
