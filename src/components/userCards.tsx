"use client";
import React, { useState } from "react";
import { Compass } from "./svgs";
import Modal from "./modal";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const Card = ({ user }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<any>({});

  const fetchuserInfo = async () => {
    setIsModalOpen(true);
      const response = await axios.get(`${user.url}`);
      if (response.data) {
        setUserLocation(response.data);
      }
    }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow-xl   rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="flex justify-between">
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={150}
            height={150}
            className="w-24 h-24 rounded-sm  mb-4 object-cover"
          />
          <span className="cursor-pointer" onClick={() => fetchuserInfo()}>
            <Compass />
          </span>
        </div>
        <h2 className="text-lg font-semibold ">{user.login}</h2>
        <p className="text-gray-500 mb-2">{user.contributions} Commits</p>
        <div className="mx-auto text-center">
          <Link href={`repos/${user.login}`} className="custom-btn">VIEW REPOSITORIES</Link>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        userLocation={userLocation}
      />
    </>
  );
};

export default Card;
