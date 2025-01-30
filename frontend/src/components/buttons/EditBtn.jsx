import React from "react";
import "./EditBtn.css";

const EditBtn = ({ openEditor, setOpenEditor }) => {

    return (
        <a 
            className="edit-btn small-btn"
            onClick={() => setOpenEditor(!openEditor)}
        >Edit</a>
    )
}

export default EditBtn;