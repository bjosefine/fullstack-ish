import React from "react";

export const Button = ({icon, onClick}) => {
    return (
        <button onClick={onClick} className="">
            {icon && <img src={icon} alt="icon" />}
        </button>
    )
}