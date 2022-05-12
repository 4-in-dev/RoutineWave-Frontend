import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import { Input } from "@mui/material";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import TimePicker from "rc-time-picker";

import { jobActions } from "../../store/job";
import classes from "./DayRoutineMaker.module.css";

const DayRoutineMaker = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.job.currItem.data);
  const currDate = useSelector((state) => state.job.date);
  const isFinish = useSelector((state) => state.job.currItem.data.isFinish);
  const savedJobs = useSelector((state) => state.job.jobs);

  const contentHandler = (e) => {
    dispatch(jobActions.setContent(e.target.value));
  };

  const startTimeHandler = (value) => {
    dispatch(jobActions.setStartTime(value.format("HHmm")));
  };

  const completeJobHandler = (e) => {
    dispatch(jobActions.setIsFinished(e.target.checked));
  };

  const saveJobHandler = (e) => {
    e.preventDefault();

    if (data.content === '') {
      alert('일과 내용을 입력해주세요!');
      return;
    }
    const startTime = Number(data.startTime);
    if (isNaN(startTime) || startTime === 0) {
      alert('시간을 입력해주세요!')
      return;
    }
  
    const checkDuplication = savedJobs.find((job) => job[1] === startTime);
    if (checkDuplication) {
      alert("작성된 시간에 일정이 있습니다.");
      return;
    }

    dispatch(jobActions.addJob(data));
    props.onClose();
    dispatch(jobActions.setContent(""));
    dispatch(jobActions.setStartTime(""));
  };

  return (
    <div className={classes.inputWrapper}>
      <form onSubmit={saveJobHandler}>
        <div>
          <Button onClick={props.onClose}>x</Button>
        </div>
        <div>
          <Input placeholder="내용" onChange={contentHandler} />
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
              label="달성"
            />
          </FormGroup>
        </div>
        <div>
          <Button type="submit" variant="contained" size="small">
            저장
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DayRoutineMaker;
