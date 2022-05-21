export const reqDeleteJob = async (jobId, accessToken) => {
  const serverUrl = `${process.env.REACT_APP_SERVER_URL}api/schedule/${jobId}/`;
  const reqData = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  };
  try {
    await fetch(serverUrl, reqData);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
