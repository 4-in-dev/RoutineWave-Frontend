import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import styled from "styled-components";
import * as CONSTANT from "../../../lib/constants";
import { getHHmmFormat } from "../../../lib/util";
import { jobActions } from "../../../store/job";

const RoutineTemplate = () => {
  const dispatch = useDispatch();
  const entireJobs = useSelector((state) => state.job.jobs);
  const auth = useSelector((state) => state.auth);
  const currDate = useSelector((state) => state.job.date);
  const jobsOfMonth = useSelector((state) => state.job.jobsOfMonth);

  const [cookies, setCookie, removeCookie] = useCookies(["is_login"]);
  const [routineTemplates, setRoutineTemplates] = useState([]);
  const [isSelectedTpl, setIsSelectedTpl] = useState(false);
  const [currTpl, setCurrTpl] = useState("");
  const [removeTpl, setRemoveTpl] = useState("");

  useState(() => {
    const tempKeyStorage = [];
    for (const key in localStorage) {
      if (key.includes("tpl")) {
        console.log(key);
        tempKeyStorage.push(key);
      }
    }
    setRoutineTemplates(tempKeyStorage);
  }, []);

  const reqSaveJob = async (job) => {
    const serverUrl = `/api/Schedulestemplate/`;

    let reqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.is_login}`,
        "X-CSRFToken": cookies.csrftoken,
      },
      body: JSON.stringify({
        writer: auth.user.pk,
        content: job[CONSTANT.INDEX_OF_CONTENT],
        is_finished: job[CONSTANT.INDEX_OF_IS_FINISH],
        start_date: currDate,
        start_time: `${getHHmmFormat(String(job[CONSTANT.INDEX_OF_STARTTIME]))}`,
        end_date: currDate,
        end_time: "00:00",
        template_name: "temp2",
      }),
    };
    try {
      const response = await fetch(serverUrl, reqData);
      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
      return false;
    }
    return true;
  };

  const addClickHandler = (e) => {
    const templateName = window.prompt(
      "오늘 루틴을 템플릿화 하시겠습니까? 루틴 이름 정한 후 확인 버튼을 눌러주세요."
    );
    if (templateName !== "" && templateName !== null) {
      if (entireJobs.length === 0) {
        alert("템플릿화 할 일정이 없습니다.");
        return;
      }

      const templateKey = `tpl-${templateName}`;
      window.localStorage.setItem(templateKey, JSON.stringify({ jobs: entireJobs }));
      setRoutineTemplates([...routineTemplates, templateKey]);
    }
  };

  const clickedTplHandler = (e) => {
    const tplKey = `tpl-${e.target.textContent}`;
    const tplValue = JSON.parse(window.localStorage.getItem(tplKey));
    console.log(tplKey, tplValue.jobs);
    setCurrTpl(tplKey);
    dispatch(jobActions.adjustTplJob(tplValue.jobs));
    dispatch(jobActions.setIsDateChange(false));
    setIsSelectedTpl(true);
  };

  const deleteClickHandler = () => {
    console.log('remove', currTpl)
    window.localStorage.removeItem(currTpl);
    setRemoveTpl(currTpl);
  }

  return (
    <>
      <TemplateWrapper>
        <h1>ROUTINE TEMPLATES</h1>
        <TemplateArea>
          <TemplateBlock onClick={addClickHandler}>+</TemplateBlock>
          <TemplateBlock onClick={deleteClickHandler}>x</TemplateBlock>
          {routineTemplates.length > 0 &&
            routineTemplates.map((tpl) => {
              return (
                  <TemplateBlock onClick={clickedTplHandler}>{tpl.slice(4)}</TemplateBlock>
              );
            })}
        </TemplateArea>
      </TemplateWrapper>
    </>
  );
};

const TemplateWrapper = styled.div`
  width: 70%;
`;

const TemplateArea = styled.div`
  border: 1px solid blud;
  display: flex;
  flex-direction: flow;
  overflow-x: scroll;
`;

const TemplateBlock = styled.span`
  margin-top: 1rem;
  margin-right: 1rem;
  background-color: white;
  border: 1px solid black;
  border-color: rgb(202, 212, 221);
  color: black;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover,
  &:active {
    background-color: rgb(46, 144, 245);
    border: 1px solid rgb(46, 144, 245);
    opacity: 0.8;
  }
`;

const TemplateAddButton = styled.button`
  width: 7rem;
  margin-top: 1rem;
  margin-right: 1rem;
  background-color: white;
  border: 1px solid white;
  border-color: white;
  color: black;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 5px 5px 5px rgb(46, 144, 245);

  &:hover,
  &:active {
    background-color: rgb(46, 144, 245);
    border: 1px solid rgb(46, 144, 245);
    opacity: 0.8;
  }
`;

export default RoutineTemplate;
