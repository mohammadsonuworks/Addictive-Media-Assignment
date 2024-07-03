import { LISTING_VIDEOS_ENDPOINT, LISTING_VIDEOS_LIMIT } from "./config";

export function validate_email(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function count_num_of_words_in_text(text) {
  if (text === "") return 0;
  return text.split(" ").length;
}

export function fetch_listing_videos_for_user(userId) {
  const apiEndpoint = `${LISTING_VIDEOS_ENDPOINT}?userId=${userId}&limit=${LISTING_VIDEOS_LIMIT}`;
  return fetch(apiEndpoint, {
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
        return data.data.videos;
      }
      throw new Error(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export function fetch_listing_videos(userIds) {
  const promisesArray = userIds.map((userId) =>
    fetch_listing_videos_for_user(userId)
  );
  return Promise.all(promisesArray)
    .then((videos) => {
      return videos;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
