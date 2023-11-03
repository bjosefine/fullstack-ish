import React from "react";
import { Button } from "./Button";
import CloseIcon from "../assets/icons/close.svg";
import twoToneBackground from '../assets/twotone.png'
import comicSection from '../assets/comicSection.png'

export const Modal = ({ open, children, closeModal }) => {
  if (!open) return null;
  return (
    <>
      <div className="fixed w-screen h-screen bg-transparent z-30 backdrop-blur-sm">
        <img src={twoToneBackground} className="h-screen w-screen fixed"/>
        <img src={comicSection} className="fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
          <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
            <Button onClick={closeModal} icon={CloseIcon} />
            <div>{children}</div>
          </div>
          </div>
    </>
  );
};
