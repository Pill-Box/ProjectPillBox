import React from "react";
import "./DeleteBtn.css";


const DeleteBtn = props => (
  <span className="delete-btn" {...props}>
    <span className="fas fa-trash"></span>
  </span>
);

export default DeleteBtn;