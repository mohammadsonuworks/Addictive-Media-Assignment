import { useState, useEffect } from "react";
import { REGISTERED_USERS_ENDPOINT } from "../config";
import { fetch_listing_videos } from "../utils";

export default function Listing() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(REGISTERED_USERS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const isReqSuccessful = data.code === 1;
        if (isReqSuccessful) {
          const users = data.data.users;
          const userIds = users.map((user) => user._id);
          setUsers(users);
          fetch_listing_videos(userIds)
            .then((val) => {
              setVideos(val);
            })
            .catch((err) => {
              console.log(err);
              alert("Failed to fetch listing videos");
            });
        } else {
          alert("Failed to fetch users list");
        }
      })
      .catch((error) => {
        console.error("Error fetching users list:", error);
      });
  }, []);

  return (
    <div>
      <h1>Listing</h1>
    </div>
  );
}
