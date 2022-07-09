import React from "react"
import { GithubIcon, TwitterIcon, LinkedInIcon } from "../icons"

export default function SocialLinks() {
  return (
    <div className="social--links">
      <a href="https://github.com/PKLJack" className="social-link-btn">
        <GithubIcon className="bi bi-github" />
        <span>Github</span>
      </a>
      <a href="https://twitter.com/PKL_Jack" className="social-link-btn">
        <TwitterIcon className="bi bi-twitter" />
        <span>Twitter</span>
      </a>
      <a
        href="https://www.linkedin.com/in/pui-kit-li-793555177/"
        className="btn social-link-btn"
      >
        <LinkedInIcon className="bi bi-linkedin" />
        <span>LinkedIn</span>
      </a>
    </div>
  )
}
