import React, { useState } from 'react'
import { auth } from '../../firebase'

import { toast } from 'react-toastify';



const ForgotPassword = () => {


    const [email, setemail] = useState("")
    const [loading, setloading] = useState(false)

    const handleSubmit = async (e) => {

        //
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_FORGOTPASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendPasswordResetEmail(email, config).then(() => {
            setemail("");

            toast.success("check your email for password reset...")
        }).catch((err) => {
            setloading(true);
            toast.error(err);
        })




    }


    const forgotPasswordForm = () =>
        <form onSubmit={handleSubmit}>

            <input className="form-control" type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setemail(e.target.value)} />
            <br />
            <button type="submit" onClick={handleSubmit} className="btn btn-raised">Forgot Password</button>

        </form>


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger">  Loading...</h4>) : (<h4>Forgot password</h4>)}
                    {forgotPasswordForm()}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

