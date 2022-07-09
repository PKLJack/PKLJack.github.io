import React from "react"

import { GithubIcon } from "../icons"
import { ReactComponent as ArrowRight } from "bootstrap-icons/icons/arrow-right.svg"

/* 
  <img 
    src={project.image} 
    className="project--card-image" 
    alt={project.alt}
  />
*/

export default function ProjectCard(props) {
  // console.log(props)
  const { project } = props
  // console.log(project.image)

  const imgElement = (
    <img
      src={process.env.PUBLIC_URL + project.image}
      className="project--card-image"
      alt={project.alt}
    />
  )

  const viewSourceElement = (
    <a href={project.sourceUrl} className="project--card-source">
      <GithubIcon className="bi bi-github" />
      View Source
    </a>
  )

  const viewSiteElement = (
    <a href={project.siteUrl} className="project--card-site">
      <ArrowRight className="bi" />
      View Site
    </a>
  )

  const tagsElements = project.tags.map((tagText, idx) => (
    <span key={idx} className="tag">
      {`# ${tagText}`}
    </span>
  ))

  return (
    <div className="project--card">
      {imgElement}
      <h3 className="project--card-title">{project.title}</h3>
      <div className="project--card-description">
        {/* wrap in div because flex */}
        {/* <div>{project.description}</div>  */}
        {project.description}
      </div>
      <div className="project--card-urls">
        {project.sourceUrl && viewSourceElement}
        {project.siteUrl && viewSiteElement}
      </div>
      <div className="project--card-tags">{tagsElements}</div>
    </div>
  )
}