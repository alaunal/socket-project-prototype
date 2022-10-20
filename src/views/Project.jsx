import React from "react";

import { Link } from "react-router-dom";

import { isEmpty, map } from "lodash";
import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";

const Project = () => {
  const { user, leave } = useAuth();
  const { participant, notice, setSocketReset } = useSocket();

  const leaveProject = () => {
    setSocketReset();
    leave();
  };

  return (
    <div className="min-h-screen flex w-full justify-center items-center">
      <div>

        {!isEmpty(notice) && (
          <span className="bg-yellow-100 border-yellow-600 text-yellow-800 block px-4 py-3 text-sm font-semibold mb-4">{notice}</span>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-light mb-4 text-gray-800">
            Hi <strong>{user.participant.username}</strong>,
          </h1>
          <p className="text-lg text-gray-600">
            Now you has been join at project <strong>{user.project.name}</strong>
          </p>
        </div>

        {!isEmpty(participant) && (
          <>
            <p className="mb-4 text-gray-700">
              <strong>Participant:</strong>
            </p>
            <ul className="mb-10">
              {map(participant, (row, idx) => (
                <li key={idx} className="block border rounded border-gray-300 bg-gray-100 px-3 py-2 mb-3 last:mb-0">
                  {row.username} {(row.isActive) && <span className="bg-gray-200 rounded px-2 py-1 text-gray-700 text-xs ml-2">Active</span>}
                </li>
              ))}
            </ul>
          </>
        )}

        <div>
          <Link to="/project/detail">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white h-10 px-10 py-1 inline-flex justify-center items-center font-medium rounded-md mx-2"
              type="button"
            >
              Detail
            </button>
          </Link>

          <button
            className="bg-gray-800 hover:bg-gray-900 text-white h-10 px-10 py-1 inline-flex justify-center items-center font-medium rounded-md mx-2"
            type="button"
            onClick={() => leaveProject()}
          >
            Leave project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
