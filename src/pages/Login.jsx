import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from "../assets/Images/login.webp"

const Login = () => {
  return (
    <Template
    title={"Welcome Back"}
    description1={""}
    description2={""}
    image={loginImg}
    formType={"login"}
    />
  )
}

export default Login