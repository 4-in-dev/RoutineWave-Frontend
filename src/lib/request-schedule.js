export const reqDeleteJob = async (jobId, cookies) => {
  // const serverUrl = `/api/schedule/${jobId}/`;
  const serverUrl = process.env.REACT_APP_SERVER_URL + "/api/schedule/${jobId}/";
  const reqData = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookies.is_login}`,
      "Access-Control-Allow-Origin": '*',
      "X-CSRFToken": cookies.csrftoken
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


export const reqDayJob = async (targetDay, accessToken) => {
  const serverUrl = `/api/schedule?day=${targetDay}`;
  const reqData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": '*'
    },
  };
  try {
    const response = await fetch(serverUrl, reqData);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const reqMonthJob = async (targetMonth, accessToken) => {
  const serverUrl = `/api/schedule?month=${targetMonth}`;
  const reqData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": '*'
    },
  };
  try {
    const response = await fetch(serverUrl, reqData);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
