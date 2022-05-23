import React from 'react';
import LandingHeader from "../components/LandingHeader";
import Feature from "../components/Feature"
import About from "../components/About";
import aboutimage from "../assets/about.png";
import aboutimage1 from "../assets/download.png";
import Contact from "../components/Contact"

function Landing() {
  return (
    <div className="LandingApp">
        <LandingHeader />
        <Feature />
        <About image={aboutimage} title="make routine" desc="시간을 지정해서 계획을 수립해보세요. 날짜 별로 일간 루틴을 설정하고 관리할 수 있습니다." button="바로가기"/>
        <About image={aboutimage1} title="check achivement" desc="누적달성도를 통해서 계획을 얼마나 실천했는지 확인하고 점검할 수 있습니다." button="바로가기"/>
        <Contact/>
    </div>
  );
}

export default Landing;
