import React from 'react';
import '../Mypage.css';
import {useSelector} from "react-redux";


function Profile() {

  const user = useSelector((state) => state.auth.user);
  return (
    <div className="profile">
      <img id="profile" src="../assets/profile.png" />
      <h5>안녕하세요. <span>{user.nickname}</span>님</h5>
      <h5><span>mail : </span>{user.email}</h5>
      <button>회원정보수정</button>

        <h3>my routine wave</h3>
        <img src="../assets/achievement.png" />
        <h3>my radar</h3>
        <img src="../assets/radar.png" />
    </div>
  );
}

export default Profile;