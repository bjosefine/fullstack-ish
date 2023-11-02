import React from "react";
import { Button } from "./Button";
import CloseIcon from "../assets/icons/close.svg";
export const Modal = ({ open, children, closeModal }) => {
  if (!open) return null;
  return (
    <>
      
        <div className="bg-fuchsia-900 w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Button onClick={closeModal} icon={CloseIcon} />
          <div>{children}</div>
        </div>

    </>
  );
};
