import React from 'react'
import Header from 'components/Header/Header'
import classes from './AppLayout.scss'

class AppLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  render() {
    return (
      <div className='layout-container'>
        <Header />
        <div className={`layout-main ${classes.mainLayout}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AppLayout
