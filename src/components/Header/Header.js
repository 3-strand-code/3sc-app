import React, { Component } from 'react'
import { Menu, MenuItem } from 'stardust'
export default class Header extends Component {
  render() {
    return (
      <Menu>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Assignments</MenuItem>
        <MenuItem>My Account</MenuItem>
      </Menu>
    )
  }
}
