import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'initail',
}

class CourseDetails extends Component {
  state = {courseDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const each = data.course_details
      const newData = {
        id: each.id,
        description: each.description,
        imageUrl: each.image_url,
        name: each.name,
      }
      this.setState({
        courseDetails: newData,
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

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails

    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="details-container">
            <img src={imageUrl} alt={name} />
            <div className="text-container">
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  onClickRetry = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.inProgress,
      },
      this.getData,
    )
  }

  renderFailurView = () => (
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

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailurView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }
}

export default CourseDetails
