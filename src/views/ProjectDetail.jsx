import React from "react";
import { Link } from "react-router-dom";

import { isEmpty } from "lodash";

import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";

const ProjectDetail = () => {
  const { user } = useAuth();
  const { notice } = useSocket();

  return (
    <div className="min-h-screen flex w-full justify-center items-center">
      <div className="">
        {!isEmpty(notice) && (
          <span className="bg-yellow-100 border-yellow-600 text-yellow-800 block px-4 py-3 text-sm font-semibold mb-4">{notice}</span>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-light mb-4 text-gray-800">
            Hi <strong>{user.participant.username}</strong>,
          </h1>
          <p className="text-lg text-gray-600">
            Now you at detail project <strong>{user.project.name}</strong>
          </p>
        </div>

        <Link to="/project/">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white h-10 px-10 py-1 inline-flex justify-center items-center font-medium rounded-md mx-2"
            type="button"
          >
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
