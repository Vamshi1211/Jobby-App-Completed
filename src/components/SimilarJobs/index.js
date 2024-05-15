import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {eachJob} = props

  const updatedJobs = {
    companyLogoUrl: eachJob.company_logo_url,
    title: eachJob.title,
    rating: eachJob.rating,
    jobDescription: eachJob.job_description,
    employmentType: eachJob.employment_type,
    location: eachJob.location,
  }

  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    employmentType,
    location,
  } = updatedJobs

  return (
    <li className="similar-job-list-item-container">
      <div className="logo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <div className="description-container">
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>

      <div className="similar-location-internship">
        <div className="location-internship-container">
          <IoLocationSharp className="icon" />
          <p className="name">{location}</p>
        </div>
        <div className="location-internship-container">
          <BsFillBriefcaseFill className="icon" />
          <p className="name">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
