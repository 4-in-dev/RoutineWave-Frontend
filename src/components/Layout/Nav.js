import React from 'react'
import {Link} from 'react-router-dom'

import classes from './Nav.module.css'

const Nav = () => {
  return (
    <div className={classes.wrapper}>
      <h2>RountineWave</h2>
      <ul>
        <li><Link to='/'>홈</Link></li>
        <li><Link to='/login'>로그인</Link></li>
      </ul>
    </div>
  )
}

export default Nav
