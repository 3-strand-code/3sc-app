import React, { Component } from 'react'
import { Grid, Header, Button } from 'stardust'

class ProfileView extends Component {
  render() {
    return (
      <Grid className='equal width'>
        <Grid.Column>
          <Header.H1>Profile</Header.H1>
        </Grid.Column>

        <Grid.Column>
          <Button className='icon'>
            <i className='github icon' />
            GitHub
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ProfileView
