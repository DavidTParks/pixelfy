import { Icons } from "../icons"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    findMatchingStyleFromModelId,
    scenarioGenerators,
    scenarioModelData,
    sizeDisabledGenerators,
    sizeLockedGenerators,
    sizeLockedGeneratorsSizeValue,
    supplementalPromptMap,
} from "@/lib/generators"
import Image from "next/image"

export const StyleRadioGroup = () => {
    return (
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
            {Object.keys(scenarioModelData).map((key) => {
                return (
                    <Label
                        htmlFor={scenarioModelData[key].id}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                        {/* {scenarioModelData[key]?.featuredImage && (
                            <Image
                                className="rounded-sm overflow-hidden"
                                alt="Featured image"
                                width={512}
                                height={512}
                                unoptimized
                                src={scenarioModelData[key].featuredImage}
                            />
                        )} */}
                        <RadioGroupItem
                            key={key}
                            value={scenarioModelData[key].id}
                            id={scenarioModelData[key].id}
                            className="sr-only"
                        />

                        {scenarioModelData[key].name}
                    </Label>
                )
            })}
        </RadioGroup>
    )
}
