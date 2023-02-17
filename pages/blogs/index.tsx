import fs from "fs"
import path from "path"

import matter from "gray-matter"
import Head from "next/head"
import Link from "next/link"
import { Container } from "semantic-ui-react"

import BlogHeader from "../../components/BlogHeader"
import { useDarkTheme } from "../../contexts/ThemeContext"
import styles from "../../styles/Blogs.module.scss"

type Props = {
  blogs: Array<any>
}

type BlogCardProps = {
  blogMeta: any
}

function BlogCard({ blogMeta }: BlogCardProps) {
  return (
    <>
      <div className={styles.blogcard}>
        <h3 className={styles.title}>
          <Link href={`/blogs/${blogMeta.slug}`}>
            {blogMeta.title}
          </Link>
        </h3>
        <p className={styles.date}>{blogMeta.created_at}</p>
        <p className={styles.excerpt}>{blogMeta.excerpt}</p>
      </div>
    </>
  )
}

export default function Blogs(props: Props) {
  const { blogs } = props

  if (Array.isArray(blogs)) {
    blogs.sort((a, b) => {
      if (a.frontmatter.created_at < b.frontmatter.created_at) {
        return 1
      } else if (a.frontmatter.created_at > b.frontmatter.created_at) {
        return -1
      } else {
        return 0
      }
    })
  }

  const isDarkTheme = useDarkTheme()

  const pageStyles = `${styles.page} ${isDarkTheme && styles.dark}`

  return (
    <>
      <Head>
        <title>Blogs by PKLJack</title>
        <meta name="description" content="Personal blog by PKLJack. I learn, I build, I share." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={pageStyles}>
        <Container>
          <BlogHeader />
          <h1 className={styles.page_title}>Blogs</h1>
          {blogs.map((b, i) => {
            return <BlogCard key={i} blogMeta={b.frontmatter} />
          })}
        </Container>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const blogsDir = path.resolve(process.env.NEXT_PUBLIC_BLOG_DIR as string)

  /* 
    Copy images directory 
  */
  const localImagesDir = path.join(blogsDir, "images", "blogs") // need "blogs" for namespacing
  const publicImagesDir = path.resolve("public", "images", "blogs")

  if (!fs.existsSync(localImagesDir)) {
    throw new Error(`Images Directory Not Found: ${localImagesDir}`)
  }

  const localImages = fs.readdirSync(localImagesDir)
  const publicImages = fs.readdirSync(publicImagesDir)

  const newImages = localImages.filter((value) => !publicImages.includes(value))
  console.log("New Images to copy:")
  console.table(newImages)

  newImages.forEach((filename) => {
    console.log(`Copying ${filename}`)
    const srcFile = path.join(localImagesDir, filename)
    const destFile = path.join(publicImagesDir, filename)
    console.log(`${srcFile} => \n  ${destFile}`)
    fs.copyFileSync(srcFile, destFile)
  })

  /* 
    Parse Markdown files 
  */
  const fileNames = fs.readdirSync(blogsDir)
  // console.log(fileNames)

  const blogs = fileNames
    .filter((filename) => path.extname(filename) == ".md")
    .map((fp) => {
      const markdownWithMeta = fs.readFileSync(path.join(blogsDir, fp), "utf-8")
      const { data: frontmatter, content } = matter(markdownWithMeta)

      for (const key of ["created_at", "updated_at"]) {
        const [year, month, day] = frontmatter[key].split("-")
        frontmatter[`${key}_year`] = year
        frontmatter[`${key}_month`] = month
        frontmatter[`${key}_day`] = day
      }

      return {
        frontmatter: frontmatter,
      }
    })

  return {
    props: {
      blogs: blogs,
    },
  }
}
