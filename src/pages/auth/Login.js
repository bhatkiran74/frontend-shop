import React, { useState } from 'react'
import { auth, googleAuthProvider, facebookAuthProvider } from '../../firebase'
import { MailOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Login = () => {


    const history = useHistory()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        //
        e.preventDefault();
        setloading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);

            const { user } = result;

            const idTokenResult = await user.getIdTokenResult();

            console.log("user: ", user);
            console.log("idtoken :", idTokenResult);

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                },
            })
            history.push('/')
            toast.success(`login with ${email} `)
        }
        catch (err) {
            console.log(err);
            toast.error(err)
            setloading(false);
        }

    }

    const googleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await auth.signInWithPopup(googleAuthProvider);

            const { user } = result;

            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                },
            })
            history.push('/')
            toast.success(`login with google `)
        }
        catch (err) {
            toast.error(err)
        }

    }

    const facebookLogin = async (e) => {


        try {
            const result = await auth.signInWithPopup(facebookAuthProvider)
            const { user } = result;

            const idTokenResult = await user.getIdTokenResult();


            console.log("result :", result);
            console.log("idToken : ", idTokenResult);

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                },
            })
            history.push('/')
            toast.success(`login with facebook `)
            console.log("name ", user.displayName);
        }
        catch (err) {

        }

    }



    const loginForm = () =>
        <form onSubmit={handleSubmit}>

            <div className="from-group">
                <input className="form-control" type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setemail(e.target.value)} />
                <br />
                <input className="form-control" type="password" placeholder="Enter Your password" value={password} onChange={(e) => setpassword(e.target.value)} />

            </div>  <br />
            <Button type="primary" icon={<MailOutlined />} size="large" disabled={!email || password.length < 6} onClick={handleSubmit} block>
                Login with mail
            </Button>
            <Link to="/forgot/password">forgot password</Link>
            <br />

        </form>


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger">  Loading...</h4>) : (<h4>Login</h4>)}
                    {loginForm()}
                    <Button type="danger" icon={<GoogleOutlined />} size="large" onClick={googleLogin} block>
                        Login with Google
            </Button>
                    <hr />
                    <Button type="primary" icon={<FacebookOutlined />} size="large" onClick={facebookLogin} block>
                        Login with facebook
            </Button>
                </div>
            </div>
        </div>
    )
}

export default Login

