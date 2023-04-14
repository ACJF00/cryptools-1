import React, { useState, useEffect } from "react";
import withAuth from "../components/withAuth";
import axios from "axios";
import ProfileInfos from "../components/dashboard/ProfileInfos";
import ProfileReceived from "../components/dashboard/ProfileReceived";

const Dashboard = () => {
  const [tab, setTab] = useState("profile");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(response.data);
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center text-2xl">Dashboard</h1>
      <div className="flex justify-center gap-x-4 pt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTab("profile")}
        >
          Profile
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTab("portfolio")}
        >
          Portfolio
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTab("received")}
        >
          Received
        </button>
      </div>
      {tab === "profile" && <ProfileInfos userData={userData} />}
      {tab === "portfolio" && <ProfileReceived />}
      {tab === "received" && <ProfileReceived userData={userData} />}
    </div>
  );
};

export default withAuth(Dashboard);
