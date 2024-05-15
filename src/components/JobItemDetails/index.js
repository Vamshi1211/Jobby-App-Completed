import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsRoute from '../SkillsRoute'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {jobDetailsAndSimilarJobs: {}, apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        jobDetails: fetchedData.job_details,
        similarJobs: fetchedData.similar_jobs,
      }
      this.setState({
        jobDetailsAndSimilarJobs: updatedData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetailsAndSimilarJobs} = this.state
    const updatedValues = {
      companyLogoUrl: jobDetailsAndSimilarJobs.jobDetails.company_logo_url,
      companyWebsiteUrl:
        jobDetailsAndSimilarJobs.jobDetails.company_website_url,
      employmentType: jobDetailsAndSimilarJobs.jobDetails.employment_type,
      id: jobDetailsAndSimilarJobs.jobDetails.id,
      jobDescription: jobDetailsAndSimilarJobs.jobDetails.job_description,
      lifeAtCompany: jobDetailsAndSimilarJobs.jobDetails.life_at_company,
      location: jobDetailsAndSimilarJobs.jobDetails.location,
      packagePerAnnum: jobDetailsAndSimilarJobs.jobDetails.package_per_annum,
      rating: jobDetailsAndSimilarJobs.jobDetails.rating,
      title: jobDetailsAndSimilarJobs.jobDetails.title,
      skills: jobDetailsAndSimilarJobs.jobDetails.skills,
    }

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = updatedValues

    return (
      <>
        <div className="job-list-items-container">
          <div className="list-item-container">
            <div className="logo-and-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>

            <div className="location-internship-package">
              <div className="location-internship">
                <div className="location-internship-container">
                  <IoLocationSharp className="icon" />
                  <p className="name">{location}</p>
                </div>
                <div className="location-internship-container">
                  <BsFillBriefcaseFill className="icon" />
                  <p className="name">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="break-line" />
            <div className="description-container">
              <div className="description-link-container">
                <h1 className="description-heading">Description</h1>
                <a href={companyWebsiteUrl} className="company-link">
                  Visit <FaExternalLinkAlt className="link-icon" />
                </a>
              </div>

              <p className="description">{jobDescription}</p>
            </div>
          </div>

          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachItem => (
              <SkillsRoute key={eachItem.name} eachSkill={eachItem} />
            ))}
          </ul>

          <div className="life-at-company-container">
            <div className="life-and-des-container">
              <h1 className="life-heading">Life at Company</h1>
              <p className="life-des">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderSimilarJobs = () => {
    const {jobDetailsAndSimilarJobs} = this.state
    const {similarJobs} = jobDetailsAndSimilarJobs

    return (
      <ul className="similar-jobs-container">
        {similarJobs.map(eachItem => (
          <SimilarJobs key={eachItem.id} eachJob={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryButtonClicked = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="error-heading">Oops! Something Went Wrong</h1>
      <p className="error-des">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.retryButtonClicked}
      >
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.success:
        return this.renderJobDetails()
      case apiStatusValue.inProgress:
        return this.renderLoading()
      case apiStatusValue.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderViews()}</div>
      </>
    )
  }
}

export default JobItemDetails
