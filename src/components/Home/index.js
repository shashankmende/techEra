import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'initail',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getFormattedData = each => ({
    id: each.id,
    name: each.name,
    logoUrl: each.logo_url,
  })

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const newData = data.courses.map(each => this.getFormattedData(each))

      this.setState({
        coursesList: newData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="loading-container">
        <div data-testid="loader">
          <Loader type="ThreeDots" color="blue" height={50} width={50} />
        </div>
      </div>
    </>
  )

  onClickRetry = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.inProgress,
      },
      this.getData,
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="failure-bg-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button
            className="retryBtn"
            type="button"
            onClick={this.onClickRetry}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <>
        <Header />
        <h1 className="heading">Courses</h1>
        <ul className="courses-container">
          {coursesList.map(each => (
            <CourseItem course={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}
export default Home
