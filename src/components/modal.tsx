"use client";
import React, { useState } from "react";
import { CloseIcon, Compass } from "./svgs";

const Modal = ({ isOpen, onClose, userLocation }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        <h4 className="text-center mb-3  text-2xl font-bold">
          {userLocation?.login}
        </h4>
        {userLocation?.location ? (
          <span className="flex gap-1 justify-center">
            {" "}
            <Compass />{" "}
            <h4 className="text-center">{userLocation?.location}</h4>
          </span>
        ) : (
          <b className="justify-center flex">Oppss No Location Found...</b>
        )}
      </div>
    </div>
  );
};

export default Modal;
