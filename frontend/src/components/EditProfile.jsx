import React, { useState } from "react";
import "./EditProfile.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "./input_fields/MyTextInput";


const EditProfile = ({ user }) => {
    return (
        <div id="edit-profile">
            <Formik
                initialValues={{ 
                    firstname: user.firstname, 
                    lastname: user.lastname 
                }}
                validationSchema={
                    Yup.object({
                    firstname: Yup.string().max(20, "Must be 20 characters or less").required("First Name is required"),
                    lastname: Yup.string().max(20, "Must be 20 characters or less").required("Last Name is required"),
                    })
                }

            >
                {({ handleChange, values }) => (
                    <Form>
                        <label htmlFor="firstname" className="label">First Name:</label>
                        <MyTextInput
                            id="firstname"
                            name="firstname"
                            type="text"
                            value={values.firstname}
                            onChange={handleChange}
                        />
                        <label htmlFor="lastname" className="label">Last Name:</label>
                        <MyTextInput
                            id="lastname"
                            name="lastname"
                            type="text"
                            value={values.lastname}
                            onChange={handleChange}
                        />
                        <button type="submit" className="save-changes-btn small-btn">
                            Save Changes
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfile;