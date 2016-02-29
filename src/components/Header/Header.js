import React, { Component } from 'react'
import { Container, Menu } from 'stardust'
import { Link } from 'react-router'

export default class Header extends Component {
  render() {
    return (
      <Menu>
        <Container>
          <Link to='/profile'>
            <Menu.Item>Profile</Menu.Item>
          </Link>
          <Link to='/dashboard'>
            <Menu.Item>Dashboard</Menu.Item>
          </Link>
        </Container>
      </Menu>
    )
  }
}
