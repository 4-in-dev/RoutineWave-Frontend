import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import { Input } from "@mui/material";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import TimePicker from "rc-time-picker";

import { jobActions } from "../../store/job";
import { getHHmmFormat } from "../../lib/util";
import { useCookies } from "react-cookie";
import classes from "./DayRoutineMaker.module.css";

const DayRoutineMaker = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["is_login"]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.job.currItem.data);
  const currDate = useSelector((state) => state.job.date);
  const jobsOfMonth = useSelector((state) => state.job.jobsOfMonth);
  const isFinish = useSelector((state) => state.job.currItem.data.isFinish);
  const savedJobs = useSelector((state) => state.job.jobs);
  const auth = useSelector((state) => state.auth);

  const contentHandler = (e) => {
    dispatch(jobActions.setContent(e.target.value));
  };

  const startTimeHandler = (value) => {
    dispatch(jobActions.setStartTime(value.format("HHmm")));
  };

  const completeJobHandler = (e) => {
    dispatch(jobActions.setIsFinished(e.target.checked));
  };

  const reqSaveJob = async () => {
    const serverUrl = `${process.env.REACT_APP_SERVER_URL}api/schedule/`;
    const reqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies.is_login}`,
        "X-CSRFToken": cookies.csrftoken
      },
      body: JSON.stringify({
        writer: auth.user.pk,
        content: data.content,
        is_finished: data.isFinish,
        start_date: currDate,
        start_time: `${getHHmmFormat(data.startTime)}`,
        end_date: currDate,
        end_time: "00:00",
      }),
    };
    try {
      const response = await fetch(serverUrl, reqData);
      const responseData = await response.json();
      
      dispatch(jobActions.addJob(responseData));
    } catch (error) {
      console.log(error.message);
      return false;
    }
    return true;
  };

  const saveJobHandler = async (e) => {
    e.preventDefault();

    if (data.content === "") {
      alert("?????? ????????? ??????????????????!");
      return;
    }
    const startTime = Number(data.startTime);
    if (isNaN(startTime) || startTime === 0) {
      alert("????????? ??????????????????!");
      return;
    }

    const checkDuplication = savedJobs.find((job) => job[1] === startTime);
    if (checkDuplication) {
      alert("????????? ????????? ????????? ????????????.");
      return;
    }

    // ?????? ?????? request
    if(!await reqSaveJob()) {
      alert('?????? ????????? ?????? ???????????????.');
      return;
    } 

    // ?????? ??? ????????? ??????
    dispatch(jobActions.setJobListOfMonth([...jobsOfMonth, currDate]));

    // ?????? ?????? ??? ??????
    props.onClose();
    dispatch(jobActions.setContent(""));
    dispatch(jobActions.setStartTime(""));
    dispatch(jobActions.setIsFinished(false));
  };

  return (
    <div className={classes.inputWrapper}>
      <form onSubmit={saveJobHandler}>
        <div>
          <Button onClick={props.onClose}>x</Button>
        </div>
        <div>
          <Input placeholder="??????" onChange={contentHandler} />
        </div>
        <div>
          <span>start time:</span>
          <span className={classes.todayMDD}>{currDate}</span>
          <TimePicker
            defaultOpenValue={moment()}
            showSecond={false}
            minuteStep={30}
            allowEmpty={false}
            onChange={startTimeHandler}
          />
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox size="small" checked={isFinish} onChange={completeJobHandler} />}
              label="??????"
            />
          </FormGroup>
        </div>
        <div>
          <Button type="submit" variant="contained" size="small">
            ??????
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DayRoutineMaker;
