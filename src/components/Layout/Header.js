import React, {Fragment} from 'react'

import Nav from './Nav'
import classes from './Header.module.css'


const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Nav />
      </header>
    </Fragment>
  )
}

export default Header
