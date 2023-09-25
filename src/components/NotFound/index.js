import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="failure-bg-container">
      <div className="text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
          alt="not found"
          className="not-found"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
      </div>
    </div>
  </>
)

export default NotFound
