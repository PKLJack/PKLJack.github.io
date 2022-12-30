import fs from "fs"
import path from "path"

import matter from "gray-matter"
import { marked } from "marked"
import Head from "next/head"
import Link from "next/link"
import { Container } from "semantic-ui-react"

import BlogHeader from "../../../../../components/BlogHeader"
import SocialLinks from "../../../../../components/SocialLinks"
import { useDarkTheme } from "../../../../../contexts/ThemeContext"
import styles from "../../../../../styles/Blog.module.scss"
import { dateStringToArray } from "../../../../../utils"

type Props = {
  frontmatter: any
  content: string
  year: string
  month: string
  day: string
  slug: string
}

function LinkMe() {
  return (
    <>
      <div className={styles.linkme}>
        <h2>PKLJack</h2>
        <p>
          Personal blog by{" "}
          <a href="https://www.linkedin.com/in/pui-kit-li-793555177/">
            PKLJack
          </a>
        </p>
        <p>
          I <strong>learn</strong>, I <strong>build</strong>, I{" "}
          <strong>share</strong>
        </p>
        <SocialLinks />
      </div>
    </>
  )
}

export default function Blog(props: Props) {
  const {
    frontmatter: { title, tags, created_at },
    content,
  } = props

  const isDarkTheme = useDarkTheme()

  const pageStyles = `${styles.page} ${isDarkTheme && styles.dark}`
  // console.log(pageStyles)

  // console.log(tags)

  if (!Array.isArray(tags)) {
    throw "Wrong type"
  }

  const tagElements = tags.map((text, i) => (
    <span key={i} className={styles.tag}>
      {text}
    </span>
  ))

  return (
    <>
      <Head>
        <title>{`Blog | ${title}`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={pageStyles}>
        <Container className={styles.blog}>
          <BlogHeader />
          <div className={styles.meta}>
            <h1 className={styles.title}>{title}</h1>
            <div>Posted on: {created_at}</div>
            <div>
              Tags: <span className={styles.tags}>{tagElements}</span>
            </div>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
          <div className={styles.prefooter}>
            <LinkMe />
            <Link href={"/blogs"} className={styles.goback}>
              Go Back
            </Link>
          </div>
        </Container>
      </div>
    </>
  )
}

export async function getStaticProps(context: any) {
  const { params } = context

  const markdownWithMeta = fs.readFileSync(
    path.join(
      "assets",
      "blogs",
      `${params.year}-${params.month}-${params.day} ${params.slug}.md`
    ),
    "utf-8"
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      content,
      year: params.year,
      month: params.month,
      day: params.day,
      slug: params.slug,
    },
  }
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(path.join("assets", "blogs"))

  const paths = fileNames.map((fileName) => {
    const [dateString, slug] = fileName.split(" ")
    const [year, month, day] = dateStringToArray(dateString)

    return {
      params: {
        year,
        month,
        day,
        slug: slug.replace(".md", ""),
      },
    }
  })

  return { paths, fallback: false }
}
