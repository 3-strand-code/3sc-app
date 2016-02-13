import React from 'react'
import Header from 'components/Header/Header'
import './AppLayout.scss'
import { Grid } from 'stardust'

class AppLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  render() {
    return (
      <Grid className='one column'>
        <Grid.Column>
          <Header />
        </Grid.Column>
        <Grid.Column>
          <Grid className='one column padded'>
            <Grid.Column>
              {this.props.children}
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
}

export default AppLayout
