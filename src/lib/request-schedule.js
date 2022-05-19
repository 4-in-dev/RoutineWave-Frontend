export const reqDeleteJob = async (jobId) => {
  const serverUrl = `${process.env.REACT_APP_SERVER_URL}api/schedule/${jobId}/`;
  const reqData = {
    method: "DELETE",
  };
  try {
    await fetch(serverUrl, reqData);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
