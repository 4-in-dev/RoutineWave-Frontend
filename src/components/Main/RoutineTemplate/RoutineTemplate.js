import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { jobActions } from "../../../store/job";

const RoutineTemplate = () => {
  const dispatch = useDispatch();
  const entireJobs = useSelector((state) => state.job.jobs);

  const [routineTemplates, setRoutineTemplates] = useState([]);
  const [currTpl, setCurrTpl] = useState("");

  useState(() => {
    const tempKeyStorage = [];
    for (const key in localStorage) {
      if (key.includes("tpl")) {
        tempKeyStorage.push(key);
      }
    }
    setRoutineTemplates(tempKeyStorage);
  }, []);

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
    
    setCurrTpl(tplKey);
    dispatch(jobActions.adjustTplJob(tplValue.jobs));
    dispatch(jobActions.setIsDateChange(true));
  };

  const deleteClickHandler = () => {
    window.localStorage.removeItem(currTpl);
  }

  return (
    <>
      <TemplateWrapper>
        <h1>ROUTINE TEMPLATES</h1>
        <TemplateArea>
          <TemplateBlock onClick={addClickHandler}>+</TemplateBlock>
          <TemplateBlock onClick={deleteClickHandler}>x</TemplateBlock>
          {routineTemplates.length > 0 &&
            routineTemplates.map((tpl, i) => {
              return (
                  <TemplateBlock onClick={clickedTplHandler} key={i}>{tpl.slice(4)}</TemplateBlock>
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
