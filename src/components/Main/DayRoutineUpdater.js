import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import { Input } from "@mui/material";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import TimePicker from "rc-time-picker";

import { jobActions } from "../../store/job";
import { getHHmmFormat } from "../../lib/util";
import classes from "./DayRoutineMaker.module.css";
import * as CONSTANT from '../../lib/constants'
import { useCookies } from "react-cookie";

const DayRoutineUpdater = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.job.currItem.data);
  const currDate = useSelector((state) => state.job.date);
  const isFinish = useSelector((state) => state.job.currItem.data.isFinish);
  const [cookies, setCookie, removeCookie] = useCookies(["is_login"]);

  useEffect(() => {
    dispatch(jobActions.setContent(props.selectedJob[CONSTANT.INDEX_OF_CONTENT]));
    dispatch(jobActions.setStartTime(props.selectedJob[CONSTANT.INDEX_OF_STARTTIME]));
    dispatch(jobActions.setIsFinished(props.selectedJob[CONSTANT.INDEX_OF_IS_FINISH]));
  }, []);

  const contentHandler = (e) => {
    dispatch(jobActions.setContent(e.target.value));
  };

  const startTimeHandler = (value) => {
    dispatch(jobActions.setStartTime(value.format("HHmm")));
  };

  const completeJobHandler = (e) => {
    dispatch(jobActions.setIsFinished(e.target.checked));
  };

  const reqUpdateJob = async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL +`/api/schedule/${props.selectedJob[CONSTANT.INDEX_OF_JOB]}/`;
    const reqData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies.is_login}`,
        "X-CSRFToken": cookies.csrftoken
      },
      body: JSON.stringify({
        content: data.content,
        is_finished: data.isFinish,
        start_date: currDate,
        start_time: `${getHHmmFormat(String(data.startTime))}`,
        end_date: currDate,
        end_time: "00:00",
      }),
    };
    try {
      const response = await fetch(serverUrl, reqData);
      const responseData = await response.json();

      dispatch(
        jobActions.updateJob({ data: responseData, seriesId: props.selectedJobIndexInSeries })
      );
    } catch (error) {
      console.log(error.message);
      return false;
    }
    return true;
  };

  const saveJobHandler = async (e) => {
    e.preventDefault();

    if (data.content === "") {
      alert("일과 내용을 입력해주세요!");
      return;
    }
    const startTime = Number(data.startTime);
    if (isNaN(startTime) || startTime === 0) {
      alert("시간을 입력해주세요!");
      return;
    }

    // 일정 저장 request
    if (!(await reqUpdateJob())) {
      alert("일정 저장에 실패 하였습니다.");
      return;
    }

    // 일정 저장 후 정리
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
          <Input placeholder="내용" onChange={contentHandler} value={data.content || ""} />
        </div>
        <div>
          <span>start time:</span>
          <span className={classes.todayMDD}>{currDate}</span>
          <TimePicker
            defaultValue={moment()
              .hour(props.selectedJob[CONSTANT.INDEX_OF_STARTTIME] / 100)
              .minute(props.selectedJob[CONSTANT.INDEX_OF_STARTTIME] % 100)}
            showSecond={false}
            minuteStep={30}
            allowEmpty={false}
            onChange={startTimeHandler}
          />
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox size="small" checked={isFinish || false} onChange={completeJobHandler} />
              }
              label="달성"
            />
          </FormGroup>
        </div>
        <div>
          <Button type="submit" variant="contained" size="small">
            수정
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DayRoutineUpdater;
