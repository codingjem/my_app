import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../components/input_fields/MyTextInput";
import { useLoginUserMutation } from "../services/userApiSlice";


const LoginPage = () => {
    const [loginUser, { data, error, isLoading }] = useLoginUserMutation();
    const navigate = useNavigate();

    return (
        <div id="login">
            <div id="login-form">
                <h1>Log In</h1>
                <Formik
                    initialValues={
                        { email: "", password: "" }
                    }
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid Email Address").required("Email is required"),
                            password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
                        })
                    }
                    onSubmit={
                        async (values, { setSubmitting, setErrors, resetForm }) => {
                            try {
                                // User data fetched from backend
                                const data = await loginUser(values).unwrap();
                                // Go to home page
                                navigate("/home");
                            } catch (err) {
                                console.log("Login Error", err);
                                setErrors(err.data);
                            } finally {
                                setSubmitting(false);
                            }
                        }
                    }
                >
                    <Form className="login-form">
                        <MyTextInput 
                            name="email" 
                            type="email" 
                            placeholder="Email Address" 
                        />
                        <MyTextInput 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                        />
                        <button type="submit" className="submit-btn active">
                            Log In
                        </button>
                    </Form>
                </Formik>
                <p>
                    New here?
                    <a className="form-links" onClick={() => navigate("/signup")}>
                        Sign Up now
                    </a>
                </p>
            </div>
        </div>
        );
};

export default LoginPage;
