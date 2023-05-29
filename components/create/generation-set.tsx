"use client"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { ImageLoadingCard } from "@/components/image-loading-card"
import { ImageOptions } from "@/components/image-options"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { normalizedGeneratorMap } from "@/lib/generators"
import { cn } from "@/lib/utils"
import { ScenarioInferenceProgressResponse } from "@/types/scenario"
import { GENERATIONSATISFCATION, OutputImage } from "@prisma/client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useState } from "react"

export interface IGenerationSet {
    inferenceId: string
    modelId: string
    numImages: string
    prompt: string
    samplingSteps: number
    guidance: number
}

export const GenerationSet = ({
    inferenceId,
    modelId,
    numImages,
    prompt,
    samplingSteps,
    guidance,
}: IGenerationSet) => {
    const router = useRouter()

    const [images, setImages] = React.useState<OutputImage[]>([])
    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [progress, setProgress] = React.useState<number>(0)
    const [satisfactionSelected, setSatisfactionSelected] =
        React.useState<GENERATIONSATISFCATION | null>(null)
    const [feedbackSaving, setFeedbackSaving] = React.useState<boolean>(false)
    const [feedbackWithCommentSaving, setFeedbackWithCommentSaving] =
        React.useState<boolean>(false)

    const [feedback, setFeedback] = useState("")
    const [feedbackSaved, setFeedbackSaved] = useState(false)

    React.useEffect(() => {
        if (!inferenceId || !modelId) return

        let controller = new AbortController()

        const pollGeneration = async () => {
            try {
                let generatedImages: null | OutputImage[] = null
                let secondCount = 0
                let showedPatienceModal = false
                setIsSaving(true)
                while (!generatedImages) {
                    // Loop in 1s intervals until the alt text is ready
                    let finalResponse = await fetch(
                        `/api/generate/${inferenceId}?modelId=${modelId}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            signal: controller.signal,
                        }
                    )
                    let jsonFinalResponse: ScenarioInferenceProgressResponse =
                        await finalResponse.json()
                    setProgress(jsonFinalResponse.inference.progress)

                    if (
                        jsonFinalResponse.inference.status === "succeeded" &&
                        jsonFinalResponse?.outputImages
                    ) {
                        generatedImages = jsonFinalResponse.outputImages
                        setImages(generatedImages)
                    } else if (
                        jsonFinalResponse.inference.status === "failed"
                    ) {
                        break
                    } else {
                        if (secondCount >= 60 && !showedPatienceModal) {
                            toast({
                                title: "Still generating!",
                                description:
                                    "Sorry this is taking a while. Your generation should be done soon. Thanks for your patience",
                                variant: "default",
                            })
                            showedPatienceModal = true
                        }
                        secondCount++
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        )
                    }
                }
                setIsSaving(false)
                router.refresh()
            } catch (e) {
                console.log(e)
            }
        }

        pollGeneration()

        return () => controller?.abort()
    }, [inferenceId, modelId])

    const updateGenerationFeedback = async ({
        satisfaction,
    }: {
        satisfaction: GENERATIONSATISFCATION
    }) => {
        try {
            setFeedbackSaving(true)
            if (feedback) {
                setFeedbackWithCommentSaving(true)
            }
            await fetch("/api/feedback", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inferenceId: inferenceId,
                    modelId: modelId,
                    satisfaction: satisfaction,
                    comment: feedback,
                }),
            }).then((res) => res.json())

            if (feedback) {
                toast({
                    title: "Thanks for your feedback!",
                    description:
                        "Your feedback is invaluable. It helps make Pixelfy better. If you haven't given feedback three times, you've been credited with 1 additional credit.",
                    variant: "default",
                })
            }

            if (feedback && satisfaction === "UNSATISFIED") {
                setFeedbackSaved(true)
                setFeedbackWithCommentSaving(false)
            } else if (satisfaction === "SATISFIED") {
                setFeedbackSaved(true)
                toast({
                    title: "Thanks for your feedback!",
                    description:
                        "Your feedback is invaluable. It helps make Pixelfy better.",
                    variant: "default",
                })
            }
            router.refresh()
        } catch (e) {
            console.log(e)
            toast({
                title: "Something went wrong",
                description: "Please try to submit your feedback again",
                variant: "destructive",
            })
        } finally {
            setFeedbackSaving(false)
            setFeedbackWithCommentSaving(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="leading-tight text-center">
                    {prompt}
                </CardTitle>
                <CardDescription>
                    <div className="flex gap-2 flex-wrap justify-center w-full mt-2">
                        <Badge variant="secondary">
                            {normalizedGeneratorMap[modelId]}
                        </Badge>
                        <Badge variant="outline">
                            {samplingSteps} sampling steps
                        </Badge>
                        <Badge variant="outline">{guidance} guidance</Badge>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isSaving && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-0">
                            {Array.from(Array(parseInt(numImages)), (e, i) => {
                                return <ImageLoadingCard key={i} />
                            })}
                        </div>
                        <div className="mt-4">
                            <Progress value={progress * 100} />
                        </div>
                    </>
                )}

                {images && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="rounded-lg overflow-hidden relative w-full"
                            >
                                {image?.pixelatedImage && (
                                    <>
                                        <Image
                                            unoptimized
                                            className="object-cover w-full h-auto"
                                            height={512}
                                            width={512}
                                            alt={prompt}
                                            src={image.pixelatedImage}
                                        />
                                        <div className="absolute top-2 right-2 z-10">
                                            <ImageOptions
                                                name={image.seed}
                                                imageId={image.id}
                                                src={image.pixelatedImage}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>

            <CardFooter
                className={cn(
                    images?.length > 0 && !feedbackSaved ? "pb-6" : "pb-0"
                )}
            >
                <AnimatePresence initial={false}>
                    {images?.length > 0 && !feedbackSaved && (
                        <motion.div
                            key="feedback"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.04, 0.62, 0.23, 0.98],
                            }}
                            className="flex items-center justify-center flex-col w-full gap-2"
                        >
                            <p className="mr-2 text-sm text-muted-foreground">
                                Are you happy with this generation?
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    disabled={feedbackSaving}
                                    onClick={() => {
                                        setSatisfactionSelected(
                                            GENERATIONSATISFCATION.UNSATISFIED
                                        )
                                        updateGenerationFeedback({
                                            satisfaction:
                                                GENERATIONSATISFCATION.UNSATISFIED,
                                        })
                                    }}
                                    size="sm"
                                    variant="outline"
                                >
                                    <Icons.thumbsDown className="h-4 w-4" />
                                </Button>
                                <Button
                                    disabled={feedbackSaving}
                                    onClick={() => {
                                        setSatisfactionSelected(
                                            GENERATIONSATISFCATION.SATISFIED
                                        )
                                        updateGenerationFeedback({
                                            satisfaction:
                                                GENERATIONSATISFCATION.SATISFIED,
                                        })
                                    }}
                                    size="sm"
                                    variant="outline"
                                >
                                    <Icons.thumbsUp className="h-4 w-4" />
                                </Button>
                            </div>
                            <AnimatePresence initial={false}>
                                {satisfactionSelected === "UNSATISFIED" && (
                                    <motion.div
                                        key="content"
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        className="w-full"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                height: "auto",
                                            },
                                            collapsed: {
                                                opacity: 0,
                                                height: 0,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                    >
                                        <div className="grid gap-1 mt-2 relative">
                                            <Label htmlFor="name">
                                                Feedback
                                            </Label>

                                            <Textarea
                                                value={feedback}
                                                onChange={(e) =>
                                                    setFeedback(e.target.value)
                                                }
                                                placeholder="We'd love to hear why this generation
                                            wasn't up to par. We'll credit your
                                            account back a credit up to 3 times
                                            if you provide some context to why
                                            this wasn't great. Your feedback
                                            will help us make Pixelfy better!"
                                                maxLength={500}
                                            />
                                        </div>
                                        <Button
                                            disabled={
                                                feedbackWithCommentSaving ||
                                                feedback?.length === 0
                                            }
                                            onClick={async () =>
                                                await updateGenerationFeedback({
                                                    satisfaction:
                                                        satisfactionSelected,
                                                })
                                            }
                                            className="mt-4"
                                        >
                                            {feedbackWithCommentSaving && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Send feedback
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardFooter>
        </Card>
    )
}
