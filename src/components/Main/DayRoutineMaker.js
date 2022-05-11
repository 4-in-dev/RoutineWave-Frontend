import React from "react";

import { Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import { Input } from "@mui/material";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import TimePicker from "rc-time-picker";

import classes from "./DayRoutineMaker.module.css";

const DayRoutineMaker = () => {
  return (
    <div className={classes.inputWrapper}>
      <div>
        <Button>x</Button>
      </div>
      <div>
        <Input placeholder="내용" />
      </div>
      <div>
        <span className={classes.todayMDD}>{moment().format("dddd, Do MMMM")}</span>
        <TimePicker defaultValue={moment()} showSecond={false} minuteStep={15} />
        -
        <TimePicker defaultValue={moment()} showSecond={false} minuteStep={15} />
      </div>
      <div>
        <FormGroup>
          <FormControlLabel control={<Checkbox size="small" />} label="달성" /> 
        </FormGroup>
      </div>
      <div>
        <Button variant="contained" size="small">저장</Button>
      </div>
    </div>
  );
};

export default DayRoutineMaker;
