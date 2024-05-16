// components/RepoCard.js
import React from "react";

const RepoCard = ({ repo }: any) => {
  const { name, fork, stargazers_count, updated_at } = repo;

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white shadow-2xl rounded-md p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">{fork ? "Forked" : "Not Forked"}</p>
      <p className="text-gray-500">Stars: {stargazers_count}</p>
      <p className="text-gray-500">Last Updated: {formatDate(updated_at)}</p>
    </div>
  );
};

export default RepoCard;
