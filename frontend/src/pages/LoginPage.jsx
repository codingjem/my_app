import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPage.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../components/input_fields/MyTextInput";
import Header from "../components/Header";
import { useLoginUserMutation } from "../services/userApiSlice";
import { login } from "../features/auth/authSlice";

const LoginPage = () => {
    const [loginUser, { data, error, isLoading }] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div id="login">
            <Header />
            <div id="login-form">
                <h1>Log In</h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid Email Address").required("Email is required"),
                            password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
                        })
                    }
                    onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
                        try {
                            // User data fetched from backend
                            const data = await loginUser(values).unwrap();
                            dispatch(login(data));
                            // Go to home page
                            navigate("/home");
                        } catch (err) {
                            setErrors(err.data);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
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
// To check backend validations set validationSchema to undefined.