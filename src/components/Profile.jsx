import React from 'react';
import '../Mypage.css';
import {useSelector} from "react-redux";
import achievement from "../assets/achievement.png"
import radar from "../assets/radar.png"
import profileimg from "../assets/profile.png"

function Profile() {

  const user = useSelector((state) => state.auth.user);
  return (
    <div className="profile">
      <img id="profile" src={profileimg} />
      <h5>안녕하세요. <span>{user.nickname}</span>님</h5>
      <h5><span>mail : </span>{user.email}</h5>
      <button>회원정보수정</button>

        <h3>my routine wave</h3>
        <img src={achievement} />
        <h3>my radar</h3>
        <img src={radar} />
    </div>
  );
}

export default Profile;