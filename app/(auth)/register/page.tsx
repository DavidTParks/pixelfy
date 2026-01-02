import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const metadata = {
    title: "Sign Up Unavailable",
    description: "Pixelfy is no longer accepting new sign ups.",
}

export default function RegisterPage() {
    return (
        <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Home
            </Link>
            <div className="hidden h-full bg-muted lg:block" />
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Icons.logo className="mx-auto h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign Ups Closed
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Pixelfy has shut down and is no longer accepting new sign ups.
                            Thank you for your interest!
                        </p>
                    </div>
                    <Link
                        href="/"
                        className={cn(buttonVariants({ variant: "outline" }))}
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
