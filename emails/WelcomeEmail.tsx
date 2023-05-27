import Divider from "./components/Divider"
import Footer from "./components/Footer"
import Head from "./components/Head"
import Header from "./components/Header"
import { grayDark } from "./components/theme"
import {
    Mjml,
    MjmlBody,
    MjmlColumn,
    MjmlImage,
    MjmlSection,
    MjmlText,
    MjmlWrapper,
} from "@faire/mjml-react"

export default function WelcomeEmail({ name }: { name?: string }) {
    return (
        <Mjml>
            <Head />
            <MjmlBody width={500}>
                <MjmlWrapper cssClass="container">
                    <Header title="Welcome to Pixelfy" />
                    <MjmlSection cssClass="smooth">
                        <MjmlColumn>
                            <MjmlText cssClass="paragraph">
                                Thanks for signing up{name && `, ${name}`}!
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                My name is David, and I'm the creator of Pixelfy
                                - the open-source AI tool that lets you generate
                                professional pixel art images for your creative
                                projects.
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                Here are a few things you can do:
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Start generating images{" "}
                                <a
                                    href="https://pixelfy.ai/dashboard"
                                    target="_blank"
                                >
                                    using our AI prompt builder
                                </a>
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Save and{" "}
                                <a
                                    href="https://pixelfy.ai/dashboard/generations"
                                    target="_blank"
                                >
                                    share your generations
                                </a>
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Star the repo on{" "}
                                <a
                                    href="https://github.com/DavidTParks/pixelfy"
                                    target="_blank"
                                >
                                    GitHub
                                </a>
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Follow us on{" "}
                                <a
                                    href="https://twitter.com/pixelfydotai/"
                                    target="_blank"
                                >
                                    Twitter
                                </a>
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                Let me know if you have any questions or
                                feedback. I'm always happy to help!
                            </MjmlText>
                            <MjmlText cssClass="paragraph" color={grayDark}>
                                David from Pixelfy
                            </MjmlText>
                            <Divider />
                        </MjmlColumn>
                    </MjmlSection>
                    <Footer unsubscribe />
                </MjmlWrapper>
            </MjmlBody>
        </Mjml>
    )
}
