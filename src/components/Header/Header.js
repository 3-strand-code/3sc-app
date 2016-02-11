import React, { Component } from 'react'
import { Menu, MenuItem } from 'stardust'
import { Link } from 'react-router'
export default class Header extends Component {
  render() {
    return (
      <Menu>
        <Link to='/profile'>
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link to='/dashboard'>
          <MenuItem>Dashboard</MenuItem>
        </Link>
      </Menu>
    )
  }
}
