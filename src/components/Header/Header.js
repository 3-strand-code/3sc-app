import React, { Component } from 'react'
import { Menu } from 'stardust'
import { Link } from 'react-router'

export default class Header extends Component {
  render() {
    return (
      <Menu>
        <Link to='/profile'>
          <Menu.Item>Profile</Menu.Item>
        </Link>
        <Link to='/dashboard'>
          <Menu.Item>Dashboard</Menu.Item>
        </Link>
      </Menu>
    )
  }
}
