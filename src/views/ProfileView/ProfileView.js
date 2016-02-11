import React, { Component, PropTypes } from 'react'
import {
  Grid,
  Header,
  Column,
} from 'stardust'

class ProfileView extends Component {
  render() {
    return (
      <Grid className='equal width'>
        <Column>
          <Header.H1 className='blue center aligned'>
            Profile
          </Header.H1>
        </Column>
      </Grid>
    )
  }
}

export default ProfileView
