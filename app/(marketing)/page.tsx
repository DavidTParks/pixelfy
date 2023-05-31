import { Icons } from "@/components/icons"
import { Testimonials } from "@/components/testimonials"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { FileInput, FileMinus, Save, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60

async function getImageGenerations() {
    try {
        return (await db.outputImage.count()).toLocaleString()
    } catch (error) {
        return null
    }
}
export default async function IndexPage() {
    const imageGenerations = await getImageGenerations()

    const featuredCardData = [
        {
            image: "/pixel-background.png",
            title: "Backgrounds",
            prompts: [
                "Snow-capped peaks",
                "cozy cabin",
                "lush green landscape",
            ],
            imageAlt: "Image showing a cozy cabin with snow",
        },
        {
            image: "/dragon.png",
            title: "Fantasy RPG",
            prompts: ["fiery dragon", "crimson sky", "flame breath"],
            imageAlt: "Image showing a warlock helmet pixelated",
        },
        {
            image: "/examples/skillArt/frostbolt4.png",
            title: "Skill Art",
            prompts: ["Frostbolt", "frigid air", "shades of blue and white"],
            imageAlt: "Image showing a frostbolt skill art pixelated",
        },
        {
            image: "/energy.png",
            title: "Pixel Character Portraits",
            prompts: [
                "otherworldly avatar",
                "glowing eyes",
                "neon energy",
                "ethereal form",
            ],
            imageAlt: "16 bit cyberpunk robot portrait",
        },
    ]

    return (
        <>
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    {imageGenerations && (
                        <Badge variant="secondary">
                            {imageGenerations.toLocaleString()} images generated
                            and counting!
                        </Badge>
                    )}
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Generate high-quality pixel art with AI
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Pixelfy is a tool that harnesses bleeding-edge AI models
                        to generate professional pixel art images for your
                        creative projects
                    </p>
                    <div className="space-x-4">
                        <Link
                            href="/login"
                            className={cn(buttonVariants({ size: "lg" }))}
                        >
                            Start for free
                        </Link>
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "lg",
                                })
                            )}
                        >
                            GitHub
                        </Link>
                    </div>
                </div>
            </section>
            <section
                id="examples"
                className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Your limit is your imagination
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Pixelfy provides a variety of battle-tested generators
                        to create all types of images, and we are always adding
                        more.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                    {featuredCardData.map((card) => (
                        <Card key={card.title}>
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                            </CardHeader>

                            <CardContent className="grid gap-4 relative">
                                {card?.image && (
                                    <Image
                                        unoptimized
                                        height={512}
                                        width={512}
                                        src={card.image}
                                        className="w-full rounded-lg overflow-hidden"
                                        alt={card.imageAlt}
                                    />
                                )}
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col items-start flex-wrap">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {card.prompts.map((prompt) => (
                                            <Badge
                                                key={prompt}
                                                variant="secondary"
                                            >
                                                {prompt}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mt-8">
                    <h2 className="font-heading text-xl leading-[1.1] sm:text-xl md:text-4xl my-4">
                        And many more styles
                    </h2>
                    <Link href="/examples/pixel-background">
                        <Button>View more styles with examples</Button>
                    </Link>
                </div>
            </section>

            <section
                id="features"
                className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Features
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Pixelfy is packed with features to help you create the
                        pixel art you want with ease.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Icons.terminal size={48} />
                            <div className="space-y-2">
                                <h3 className="font-bold">Prompt Builder</h3>
                                <p className="text-sm text-muted-foreground">
                                    An AI powered prompt builder to help you
                                    create stunning images.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Icons.grid size={48} />
                            <div className="space-y-2">
                                <h3 className="font-bold">Control grid size</h3>
                                <p className="text-sm text-muted-foreground">
                                    Choose from 16x16, 32x32, 64x64, or 128x128
                                    grids.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <SlidersHorizontal size={48} />
                            <div className="space-y-2">
                                <h3 className="font-bold">Advanced Tuning</h3>
                                <p className="text-sm text-muted-foreground">
                                    Advanced options for adjusting sampling
                                    steps and prompt guidance.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <FileMinus size={48} />
                            <div className="space-y-2">
                                <h3 className="font-bold">Remove background</h3>
                                <p className="text-sm text-muted-foreground">
                                    Isolate the subject of your image by
                                    removing the background!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <FileInput size={48} />
                            <div className="space-y-2">
                                <h3 className="font-bold">
                                    Use reference images
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Upload your own reference images to
                                    influence the generation.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Save size={48} />
                            <div className="space-y-2">
                                <h3 className="font-bold">Save Generations</h3>
                                <p className="text-sm text-muted-foreground">
                                    Save all of your pixel art generations for
                                    download later.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />

            <section
                id="open-source"
                className="container py-8 md:py-12 lg:py-24"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Proudly Open Source
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Pixelfy is open source and powered by open source
                        software and AI models. <br /> The code is available on{" "}
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4"
                        >
                            GitHub
                        </Link>
                        .{" "}
                    </p>
                </div>
            </section>
        </>
    )
}
