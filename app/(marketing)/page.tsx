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
import { cn } from "@/lib/utils"
import {
    FileInput,
    FileMinus,
    Palette,
    SlidersHorizontal
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function IndexPage() {

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
            image: "/warhammer.png",
            title: "Fantasy RPG",
            prompts: ["Warhammer 40k", "space marine", "galactic"],
            imageAlt: "Image showing a warhammer character portrait pixelated",
        },
        {
            image: "/examples/skillArt/frostbolt4.png",
            title: "32x32 Skill Art",
            prompts: ["Frostbolt", "frigid air", "shades of blue and white"],
            imageAlt: "Image showing a frostbolt skill art pixelated",
        },
        {
            image: "/energy.png",
            title: "16x16 Pixel Portraits",
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
            <div className="bg-background">
                <main>
                    <div className="relative isolate">
                        <svg
                            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-secondary [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                                    width={200}
                                    height={200}
                                    x="50%"
                                    y={-1}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M.5 200V.5H200" fill="none" />
                                </pattern>
                            </defs>
                            <svg x="50%" y={-1} className="overflow-visible fill-secondary">
                                <path
                                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                    strokeWidth={0}
                                />
                            </svg>
                            <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                        </svg>

                        <div className="overflow-hidden">
                            <div className="mx-auto max-w-7xl px-6 pb-32 pt-12 sm:pt-24 lg:px-8 lg:pt-24">
                                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                    <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                                            Generate high-quality pixel art with Artificial
                                            Intelligence
                                        </h1>
                                        <p className="mt-6 text-lg leading-8 text-muted-foreground sm:max-w-md lg:max-w-none">
                                            Pixelfy is a tool that harnesses bleeding-edge AI models
                                            to generate professional pixel art images for your
                                            creative projects
                                        </p>
                                        <div className="mt-10 flex items-center gap-x-6">
                                            <Link
                                                href={siteConfig.links.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={cn(buttonVariants({ size: "lg" }))}
                                            >
                                                View on GitHub
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                        <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                            <div className="relative">
                                                <img
                                                    src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/pixelated/a5881cef-c30d-41ad-b50c-fb616628121b.png"
                                                    alt=""
                                                    className="aspect-[1/1] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                        <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                            <div className="relative">
                                                <img
                                                    src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/pixelated/08c119d8-5053-4f9e-9c92-a3cff27bd3b0.png"
                                                    alt=""
                                                    className="aspect-[1/1] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                            <div className="relative">
                                                <img
                                                    src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/pixelated/01d4a74b-fd5e-403b-97bd-2a7d0f46a434.png"
                                                    alt=""
                                                    className="aspect-[1/1] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                        <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                            <div className="relative">
                                                <img
                                                    src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/pixelated/44df07bb-b104-4f2d-9a12-50829d48ec1a.png"
                                                    alt=""
                                                    className="aspect-[1/1] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                            <div className="relative">
                                                <img
                                                    src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/pixelated/56312fac-a1bb-490e-a1b9-069f3fc1b88c.png"
                                                    alt=""
                                                    className="aspect-[1/1] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
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
                        And many more
                    </h2>
                    <Link href="/examples/blocky-cartoon">
                        <Button>View more examples</Button>
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
                            <Palette size={48} />
                            <div className="space-y-2">
                                <h3 className="font-bold">
                                    Color palette control
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Constrain your generated image to a specific
                                    color palette.
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
