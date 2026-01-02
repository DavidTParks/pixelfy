"use client"

import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import Link from "next/link"

export function LoginButton() {
    const { status } = useSession()

    // Only show dashboard link for authenticated users
    if (status !== "authenticated") {
        return null
    }

    return (
        <Link
            href="/dashboard"
            className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
            )}
        >
            Dashboard
        </Link>
    )
}
