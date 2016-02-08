import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Column,
  Row,
} from 'stardust'

import './HomeView.scss'
import ApplyForm from 'components/ApplyForm/ApplyForm'
import LoginForm from 'components/LoginForm/LoginForm'
import logoUrl from 'assets/images/icon-blue-300x300.png'

class HomeView extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const wasAuthenticated = this.props.session.isAuthenticated
    const isAuthenticated = nextProps.session.isAuthenticated

    if (!wasAuthenticated && isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <Container className='text'>
        <Grid className='middle aligned HomeView__grid'>
          <Column>
            <Grid className='very relaxed equal width'>
              <Row>
                <Column>
                  <Image src={logoUrl} className='centered small' />
                  <Header className='center aligned'>
                    3 Strand Code
                  </Header>
                </Column>
              </Row>
              <Row>
                <Column>
                  <LoginForm />
                </Column>
                <Divider className='vertical'>Or</Divider>
                <Column>
                  <ApplyForm onSubmit={this.handleApply} />
                </Column>
              </Row>
            </Grid>
          </Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
})

export default connect(mapStateToProps)(HomeView)
