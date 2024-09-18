import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../components/input_fields/MyTextInput";
import Header from "../components/Header";
import { useRegisterUserMutation } from "../services/userApiSlice";

const SignupPage = () => {
    const [registerUser, { data, error, isLoading }] =
        useRegisterUserMutation();
    const navigate = useNavigate();

    return (
        <div id="signup">
            <Header />
            <div id="signup-form">
                <h1>Sign Up</h1>
                <Formik
                    initialValues={{
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={
                        Yup.object({
                        firstname: Yup.string().max(20, "Must be 20 characters or less").required("First Name is required"),
                        lastname: Yup.string().max(20, "Must be 20 characters or less").required("Last Name is required"),
                        email: Yup.string().email("Invalid email address").required("Email is required"),
                        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
                        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required("Confirmation password is required"),
                        })
                    }
                    onSubmit={async (
                        values,
                        { setSubmitting, setErrors, resetForm }
                    ) => {
                        try {
                            await registerUser(values).unwrap();
                        } catch (err) {
                            setErrors(err.data);
                            console.log("SignUp Errors", err);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    <Form className="signup-form">
                        <MyTextInput
                            name="firstname"
                            type="text"
                            placeholder="First Name"
                        />
                        <MyTextInput
                            name="lastname"
                            type="text"
                            placeholder="Last Name"
                        />
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
                        <MyTextInput
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <button type="submit" className="submit-btn active">
                            Create Account
                        </button>
                    </Form>
                </Formik>
                <p>
                    Already have an account?
                    <a className="form-links" onClick={() => navigate("/login")}>
                        Login now
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;

// To check backend validations set validationSchema to undefined.