import Head from "next/head"
import AboutMe from "../components/AboutMe"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import SocialLinks from "../components/SocialLinks"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="App">
      <Head>
        {/* <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Hero />
      <AboutMe />
      <SocialLinks />
      <Projects />
      {/* <Survey /> */}
      <Footer />
    </div>
  )
}