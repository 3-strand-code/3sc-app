import React from 'react'
import Header from 'components/Header/Header'
import classes from './PageLayout.scss'

class PageLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  }

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

export default PageLayout
