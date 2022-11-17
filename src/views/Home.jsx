import React from "react";
import { isEmpty, map, filter } from "lodash";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const dataUser = [
  {
    id: 1,
    username: "alaunal",
    email: "alaunal@gmail.com",
  },
  {
    id: 2,
    username: "valdie",
    email: "valdie@gmail.com",
  },
  {
    id: 5,
    username: "ardo",
    email: "ardo@gmail.com",
  },
  {
    id: 4,
    username: "asbar",
    email: "asbar@gmail.com",
  },
];

const dataProject = [
  {
    id: 1,
    name: "javascript",
  },
  {
    id: 2,
    name: "HTML",
  },
  {
    id: 4,
    name: "Django",
  },
  {
    id: 3,
    name: "CSS",
  },
  {
    id: 5,
    name: "PHP",
  },
  {
    id: 6,
    name: "Flutter",
  },
];

const Home = () => {
  const { join, user } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let participantId = formData.get("participant");
    let projectId = formData.get("project");

    if (participantId.length > 0 && projectId.length > 0) {

        let participant = filter(dataUser, {id: parseInt(participantId)});
        let project = filter(dataProject, {id: parseInt(projectId)});

        // console.log(participant[0], project[0]);
      join({
        participant: participant[0],
        project: project[0],
      });
    }
  };

  if (!isEmpty(user)) {
    return <Navigate to="/project" />;
  }

  return (
    <div className="min-h-screen flex w-full justify-center items-center bg-gray-50">
      <div className="w-2/3 lg:w-2/5">
        <div className="bg-white rounded-xl shadow border border-gray-100 block px-12 py-10">
          <div className="block text-center mb-10">
            <h1 className="text-4xl text-gray-700 font-semibold">Join Project</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <label htmlFor="input-participant" className="inline-block font-medium text-lg mb-2 text-gray-600">
                participant
              </label>
              <select name="participant" className="form-select px-4 py-3 rounded-md w-full" id="input-participant">
                <option value="">Select Participant</option>
                {map(dataUser, (rows, idxs) => (
                  <option value={rows.id} key={`opt-participant-${idxs}`}>
                    {rows.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="input-project" className="inline-block font-medium text-lg mb-2 text-gray-600">
                Project
              </label>
              <select name="project" className="form-select px-4 py-3 rounded-md w-full" id="input-project">
                <option value="">Select project</option>
                {map(dataProject, (row, idx) => (
                  <option value={row.id} key={`opt-project-${idx}`}>
                    {row.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center w-full mt-8">
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white h-12 px-10 py-1 flex justify-center items-center font-medium rounded-md"
                type="submit"
              >
                Join now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
