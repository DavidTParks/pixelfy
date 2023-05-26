"use client"

import { GuidanceSelector } from "../guidance-selector"
import { SamplingStepSelector } from "../sampling-step-selector"
import { Badge } from "../ui/badge"
import { Textarea } from "../ui/textarea"
import { GenerationSet, IGenerationSet } from "./generation-set"
import { StyleRadioGroup } from "./style-radio-group"
import { Icons } from "@/components/icons"
import { ImageInfluencerSlider } from "@/components/image-influence-slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import {
    findMatchingStyleFromModelId,
    scenarioGenerators,
    scenarioModelData,
    sizeDisabledGenerators,
    sizeLockedGenerators,
    sizeLockedGeneratorsSizeValue,
    supplementalPromptMap,
} from "@/lib/generators"
import { cn, convertBase64 } from "@/lib/utils"
import { generateSchema } from "@/lib/validations/generate"
import { ScenarioInferenceResponse } from "@/types/scenario"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import va from "@vercel/analytics"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "id" | "name" | "credits">
}

type FormData = z.infer<typeof generateSchema>

export function GenerationForm({
    user,
    className,
    ...props
}: UserNameFormProps) {
    const {
        setValue,
        getValues,
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(generateSchema),
        defaultValues: {
            prompt: "",
        },
    })

    const reactivePrompt = watch("prompt")

    const [runningGenerations, setRunningGenerations] = React.useState<
        IGenerationSet[]
    >([])

    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [promptGenerating, setPromptGenerating] =
        React.useState<boolean>(false)
    const [isOpen, setIsOpen] = React.useState<boolean>(true)
    const [showAdvancedOptions, setShowAdvancedOptions] =
        React.useState<boolean>(false)
    const [modelId, setModelId] = React.useState<string>(
        scenarioGenerators.fantasyRpg
    )
    const [gridSize, setGridSize] = React.useState<string>("8")
    const [numImages, setNumImages] = React.useState<string>("4")

    const [samplingSteps, setSamplingSteps] = React.useState<number[]>([30])
    const [guidance, setGuidance] = React.useState<number[]>([7])
    const [referenceImage, setReferenceImage] = React.useState<any>(null)
    const [referenceImageInfluence, setReferenceImageInfluence] =
        React.useState<number[]>([25])

    const generatePrompt = async (e: any) => {
        e.preventDefault()
        setPromptGenerating(true)

        va.track("Prompt builder clicked", {
            user: user.id,
            model: modelId,
            prompt: getValues("prompt"),
        })

        const prompt = `
        Generate a comma-separated single sentence prompt that will be used to create an image. Include interesting visual descriptors and art styles. Make sure the prompt is less than 500 characters total, including spaces, newline characters punctuation. Do not include quotations in the prompt or the word "generate" or the word "ai". Do not use complete sentences. Please separate all descriptors with commas.
    
        Base the entire prompt on this context: ${getValues(
            "prompt"
        )} making sure to keep the style in mind which is: ${
            supplementalPromptMap[modelId]
        }`

        const response = await fetch("/api/generate/prompt-generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        })

        if (!response.ok) {
            if (response.status === 429) {
                return toast({
                    title: "Too many requests",
                    description:
                        "You have gone over your limit for requests to generate prompts. Try again in a second.",
                    variant: "destructive",
                })
            } else {
                throw new Error(response.statusText)
            }
        }

        // This data is a ReadableStream
        const data = response.body
        if (!data) {
            return
        }

        const reader = data.getReader()
        const decoder = new TextDecoder()
        let done = false
        setValue("prompt", "")

        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            setValue("prompt", getValues("prompt") + chunkValue)
        }
        setPromptGenerating(false)
    }

    async function onSubmit(data: FormData) {
        try {
            setIsSaving(true)
            const response = await fetch(
                `
                /api/generate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        parameters: {
                            pixelSize: parseInt(gridSize),
                            modelId,
                            prompt: data.prompt,
                            samplingSteps: samplingSteps[0],
                            guidance: guidance[0],
                            numImages: parseInt(numImages),
                            referenceImage,
                            influence: referenceImage
                                ? referenceImageInfluence[0]
                                : undefined,
                        },
                    }),
                }
            )

            if (!response?.ok && response.status === 402) {
                return toast({
                    title: "You are out of credits",
                    description:
                        "Purchase more credits to continue generating images, or reduce the amount of images in your generation.",
                    variant: "destructive",
                })
            } else if (!response.ok && response.status === 403) {
                return toast({
                    title: "Pending generations exceed credits",
                    description:
                        "Your current pending generations exceed your credit balance. Purchase more credits to continue generating concurrent image sets.",
                    variant: "destructive",
                })
            } else if (!response.ok) {
                await response.json()
            }

            toast({
                title: "We've queued your generation!",
                description:
                    "This may take a few minutes. Don't worry, if it fails you will not be charged credits. Feel free to generate another image set while you wait.",
                variant: "default",
            })

            const responseData: ScenarioInferenceResponse =
                await response.json()

            setRunningGenerations((prev) => [
                ...prev,
                {
                    samplingSteps: samplingSteps[0],
                    guidance: guidance[0],
                    inferenceId: responseData.inference.id,
                    modelId,
                    prompt: data.prompt,
                    numImages,
                },
            ])

            reset()
            setIsSaving(false)
        } catch (e) {
            toast({
                title: "Something went wrong",
                description:
                    "Please try to generate your image again. If the issue persists contact support.",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    const sizeGridLocked = sizeLockedGenerators.includes(modelId)
    const sixteenGridDisabled = sizeDisabledGenerators.includes(modelId)

    const userOutOfCredits = parseInt(numImages) / 4 > user?.credits

    return (
        <>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
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
                    >
                        <form
                            className={cn(className)}
                            onSubmit={handleSubmit(onSubmit)}
                            {...props}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex w-full justify-between items-center">
                                        Create Images
                                    </CardTitle>

                                    <CardDescription>
                                        Enter a prompt for a series of images
                                        you would like to create
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-8">
                                        <div>
                                            <StyleRadioGroup />
                                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 w-full">
                                                <div className="w-full lg:col-span-2">
                                                    <Label htmlFor="name">
                                                        Style
                                                    </Label>
                                                    <div className="flex items-baseline gap-4 mt-1 w-full">
                                                        <Select
                                                            value={modelId}
                                                            onValueChange={(
                                                                e
                                                            ) => {
                                                                if (
                                                                    sizeLockedGenerators.includes(
                                                                        e
                                                                    )
                                                                ) {
                                                                    setGridSize(
                                                                        sizeLockedGeneratorsSizeValue[
                                                                            e
                                                                        ]?.toString()
                                                                    )
                                                                } else if (
                                                                    sizeDisabledGenerators.includes(
                                                                        e
                                                                    )
                                                                ) {
                                                                    setGridSize(
                                                                        "8"
                                                                    )
                                                                }

                                                                va.track(
                                                                    "modelSelected",
                                                                    {
                                                                        model: e,
                                                                        user: user?.id,
                                                                    }
                                                                )

                                                                setModelId(e)
                                                            }}
                                                            defaultValue={
                                                                scenarioGenerators.fantasyRpg
                                                            }
                                                        >
                                                            <SelectTrigger className="w-full lg:max-w-sm">
                                                                <SelectValue placeholder="Select a generator" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>
                                                                        Style
                                                                    </SelectLabel>

                                                                    {Object.keys(
                                                                        scenarioModelData
                                                                    ).map(
                                                                        (
                                                                            key
                                                                        ) => {
                                                                            return (
                                                                                <SelectItem
                                                                                    className="relative flex items-center gap-2"
                                                                                    key={
                                                                                        key
                                                                                    }
                                                                                    value={
                                                                                        scenarioModelData[
                                                                                            key as keyof typeof scenarioGenerators
                                                                                        ]
                                                                                            .id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        scenarioModelData[
                                                                                            key as keyof typeof scenarioGenerators
                                                                                        ]
                                                                                            .name
                                                                                    }

                                                                                    {scenarioModelData[
                                                                                        key as keyof typeof scenarioGenerators
                                                                                    ]
                                                                                        .featuredArtist && (
                                                                                        <div className="inline-flex items-center ml-2">
                                                                                            <Badge variant="secondary">
                                                                                                Featured
                                                                                                artist
                                                                                            </Badge>
                                                                                        </div>
                                                                                    )}
                                                                                </SelectItem>
                                                                            )
                                                                        }
                                                                    )}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="name">
                                                        Number of images
                                                    </Label>
                                                    <div className="flex items-baseline gap-4 mt-1">
                                                        <Select
                                                            value={numImages}
                                                            onValueChange={
                                                                setNumImages
                                                            }
                                                            defaultValue={"4"}
                                                        >
                                                            <SelectTrigger className="w-full lg:w-[114px]">
                                                                <SelectValue placeholder="Select a generator" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem
                                                                        value={
                                                                            "4"
                                                                        }
                                                                    >
                                                                        4
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            "8"
                                                                        }
                                                                    >
                                                                        8
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            "12"
                                                                        }
                                                                    >
                                                                        12
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            "16"
                                                                        }
                                                                    >
                                                                        16
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="name">
                                                        Grid size
                                                    </Label>
                                                    <div className="flex items-baseline gap-4 mt-1">
                                                        <Select
                                                            disabled={
                                                                sizeGridLocked
                                                            }
                                                            value={gridSize}
                                                            onValueChange={
                                                                setGridSize
                                                            }
                                                            defaultValue={"8"}
                                                        >
                                                            <SelectTrigger className="w-full lg:w-[114px]">
                                                                <SelectValue placeholder="Select a generator" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem
                                                                        disabled={
                                                                            sixteenGridDisabled
                                                                        }
                                                                        value={
                                                                            "32"
                                                                        }
                                                                    >
                                                                        16x16
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            "16"
                                                                        }
                                                                    >
                                                                        32x32
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            "8"
                                                                        }
                                                                    >
                                                                        64x64
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value={
                                                                            "4"
                                                                        }
                                                                    >
                                                                        128x128
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-4 mt-8">
                                                <div className="lg:max-w-sm ">
                                                    <Label htmlFor="picture">
                                                        Reference image
                                                        (optional)
                                                    </Label>
                                                    <Input
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                            if (
                                                                e?.target?.files
                                                            ) {
                                                                const file =
                                                                    e.target
                                                                        .files[0]

                                                                const base64 =
                                                                    await convertBase64(
                                                                        file
                                                                    )

                                                                setReferenceImage(
                                                                    base64
                                                                )
                                                            }
                                                        }}
                                                        id="picture"
                                                        type="file"
                                                    />
                                                </div>
                                                {referenceImage && (
                                                    <div>
                                                        <ImageInfluencerSlider
                                                            value={
                                                                referenceImageInfluence
                                                            }
                                                            onValueChange={
                                                                setReferenceImageInfluence
                                                            }
                                                            defaultValue={[25]}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="grid gap-1 mt-8 lg:mt-8 relative">
                                                <Label htmlFor="name">
                                                    Prompt
                                                </Label>

                                                <Textarea
                                                    disabled={
                                                        isSaving ||
                                                        promptGenerating
                                                    }
                                                    placeholder={
                                                        findMatchingStyleFromModelId(
                                                            modelId
                                                        )
                                                            ?.placeholderInputText ??
                                                        "Enter a prompt or enter a phrase then click on our prompt builder button to help you out"
                                                    }
                                                    className="mt-1"
                                                    id="Prompt"
                                                    maxLength={500}
                                                    {...register("prompt")}
                                                />
                                                {errors?.prompt && (
                                                    <p className="px-1 text-xs text-red-600">
                                                        {errors.prompt.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex-col items-start w-full">
                                    <div className="flex flex-col items-start mb-10 w-full">
                                        <div className="flex flex-col items-start w-full">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            disabled={
                                                                getValues(
                                                                    "prompt"
                                                                ) === "" ||
                                                                promptGenerating
                                                            }
                                                            onClick={(e) =>
                                                                generatePrompt(
                                                                    e
                                                                )
                                                            }
                                                            className={cn(
                                                                "w-full lg:w-auto flex gap-2"
                                                            )}
                                                            variant="secondary"
                                                        >
                                                            {promptGenerating ? (
                                                                <Icons.spinner className=" h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Icons.terminal
                                                                    size={16}
                                                                />
                                                            )}
                                                            <span>
                                                                Run prompt
                                                                builder
                                                            </span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            Takes a phrase or
                                                            word from your input
                                                            and builds a prompt
                                                            for you. Powered by
                                                            ChatGPT 3.5 Turbo.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {showAdvancedOptions && (
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
                                                    duration: 0.3,
                                                    ease: [0.04, 0.62, 0.23, 1],
                                                }}
                                            >
                                                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 w-full pb-8">
                                                    <SamplingStepSelector
                                                        value={samplingSteps}
                                                        onValueChange={
                                                            setSamplingSteps
                                                        }
                                                        defaultValue={[50]}
                                                    />
                                                    <GuidanceSelector
                                                        value={guidance}
                                                        onValueChange={
                                                            setGuidance
                                                        }
                                                        defaultValue={[7]}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <Alert
                                        variant={
                                            userOutOfCredits
                                                ? "destructive"
                                                : "default"
                                        }
                                        className="mt-0"
                                    >
                                        <Icons.info className="h-4 w-4" />
                                        <AlertTitle>
                                            {userOutOfCredits
                                                ? "You have insufficient credits for this generation"
                                                : "Credit usage breakdown"}
                                        </AlertTitle>
                                        <AlertDescription>
                                            This generation will use{" "}
                                            <strong>
                                                {parseInt(numImages) / 4}{" "}
                                                {parseInt(numImages) / 4 !== 1
                                                    ? "credits"
                                                    : "credit"}{" "}
                                            </strong>
                                            once it succeeds. 1 credit = 4
                                            images.
                                        </AlertDescription>
                                    </Alert>
                                    <div className="flex flex-col lg:flex-row items-center gap-4 w-full mt-6">
                                        {userOutOfCredits ? (
                                            <Link
                                                className="w-full lg:w-auto"
                                                href="/credits"
                                            >
                                                <button
                                                    className={cn(
                                                        buttonVariants(),
                                                        className,
                                                        "w-full lg:w-auto"
                                                    )}
                                                >
                                                    <Icons.billing className="mr-2 h-4 w-4 " />
                                                    <span>
                                                        Buy more credits
                                                    </span>
                                                </button>
                                            </Link>
                                        ) : (
                                            <button
                                                disabled={
                                                    reactivePrompt === "" ||
                                                    isSaving ||
                                                    promptGenerating
                                                }
                                                type="submit"
                                                className={cn(
                                                    buttonVariants(),
                                                    className,
                                                    "w-full lg:w-auto"
                                                )}
                                            >
                                                {isSaving && (
                                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                <span>Generate</span>
                                            </button>
                                        )}

                                        <Button
                                            className={cn("w-full lg:w-auto")}
                                            onClick={(e) => {
                                                e.preventDefault()

                                                va.track(
                                                    "advancedOptionsClicked",
                                                    {
                                                        user: user?.id,
                                                    }
                                                )
                                                setShowAdvancedOptions(
                                                    !showAdvancedOptions
                                                )
                                            }}
                                            variant={"outline"}
                                        >
                                            Show advanced options
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {runningGenerations?.length > 0 && (
                <div className="w-full flex flex-col gap-4 mt-8">
                    <div>
                        <h3 className="font-heading text-xl md:text-2xl">
                            Your generations
                        </h3>
                        <p className="text-md text-muted-foreground mb-4">
                            View your generations here. You can generate image
                            sets for multiple prompts at once.
                        </p>
                    </div>

                    {runningGenerations.map((runningGeneration) => (
                        <GenerationSet
                            samplingSteps={runningGeneration.samplingSteps}
                            guidance={runningGeneration.guidance}
                            inferenceId={runningGeneration.inferenceId}
                            modelId={runningGeneration.modelId}
                            prompt={runningGeneration.prompt}
                            numImages={runningGeneration.numImages}
                        />
                    ))}
                </div>
            )}
        </>
    )
}
