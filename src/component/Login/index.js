import React, { useCallback, useState } from 'react'
import bcrypt from 'bcryptjs'
import db from '../../db.json'
import { useNavigate } from 'react-router-dom'

export default function Login({ setAuth }) {
    let navigate = useNavigate()
    const [details, setDetails] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState("")

    const handleChange = useCallback((evt) => {
        setError("")
        const { value, name } = evt?.target

        setDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }, [details])



    const handleSubmit = (e) => {
        e?.preventDefault()

        const regex = RegExp(
            /^[a-zA-Z0-9._-]+@[a-zA-Z_]+\.[a-zA-Z]{1,6}$/ // Email Regex
        );

        const userData = db.find((item) => item?.email?.toLocaleLowerCase() === details?.email?.toLocaleLowerCase())

        if (!details?.email?.trim() || !regex?.test(details?.email?.trim())) {
            setError('Invalid Email')
        } else if (!details?.password?.trim()) {
            setError('Password is required')
        } else if (userData) {
            const storedHash = userData.password;
            const isValid = bcrypt.compareSync(details?.password, storedHash);

            if (isValid) {
                navigate("/dashboard")
                setAuth(true)
                localStorage?.setItem("Auth", true)
                localStorage?.setItem("User", userData?.userType)
                localStorage?.setItem("Email", details?.email?.trim()?.toLocaleLowerCase())
            } else {
                setAuth(false)
                localStorage?.setItem("Auth", false)
                localStorage?.removeItem("User")
            }

        } else {
            setError("User not Found!");

        }
    }

    return (
        <div className="main-login-container">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value={details?.email} autoComplete='off' required aria-required="true" onChange={handleChange} />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" value={details?.password} autoComplete='off' required aria-required="true" onChange={handleChange} />
                    <i className="fa fa-eye" onClick={"handleShowPassword"} />
                    {
                        error && <span className='error'>{error}</span>
                    }
                    <button type="submit" onClick={handleSubmit}> Submit</button>
                </form>
            </div>
        </div>
    )
}
