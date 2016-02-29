import React, { Component } from 'react'
import { Button, Form, Grid, Header, Input, Segment } from 'stardust'
import tsc from 'resources/tsc'

class ProfileView extends Component {
  handleClickGithub() {
    tsc.connectGithub()
  }

  render() {
    return (
      <Grid className='equal width'>
        <Grid.Row>
          <Grid.Column>
            <Header.H1>Profile</Header.H1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header.H3 className='dividing'>
                Connect Services
              </Header.H3>
              <Button className='green' onClick={this.handleClickGithub}>
                <i className='github icon' />
                GitHub
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Form>
                <Form.Fields>
                  <Form.Field label='First Name'>
                    <Input name='first_name' />
                  </Form.Field>
                  <Form.Field label='Last Name'>
                    <Input name='last_name' />
                  </Form.Field>
                </Form.Fields>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default ProfileView
