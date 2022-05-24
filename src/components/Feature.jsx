import React from "react";
import FeatureBox from "./FeatureBox";
import Featureimage from "../assets/feature_1.png";
import Featureimage1 from "../assets/feature_2.png";
import Featureimage2 from "../assets/feature_3.png";


function Feature() {



    return (
        <div id="Features">
            <div className="a-container">
                <FeatureBox image={Featureimage} title="루틴 생성·관리" desc="Create and manage your own routine."/>
                <FeatureBox image={Featureimage1} title="달성도 체크" desc="Check your achievement and draw a growth curve."/>
                <FeatureBox image={Featureimage2} title="템플릿 불러오기" desc="You can save and recall routine templates."/>
            </div>
        </div>
    )
}

export default Feature;