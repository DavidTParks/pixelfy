"use client"

import { Icons } from "./icons"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, "name" | "image" | "email">
    credits: number
}

export function UserAccountNav({ user, credits }: UserAccountNavProps) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm text-foreground block">
                {" "}
                {credits.toLocaleString()} credits remaining
            </span>
            <Link href="/credits">
                <Button className="inline-flex gap-2" size="sm">
                    <Icons.billing size={16} />
                    <span className="hidden md:flex">Buy credits</span>
                </Button>
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger className="relative">
                    <UserAvatar
                        user={{
                            name: user.name || null,
                            image: user.image || null,
                        }}
                        className="h-8 w-8"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                            {user.name && (
                                <p className="font-medium">{user.name}</p>
                            )}
                            {user.email && (
                                <p className="w-[200px] truncate text-sm text-muted-foreground">
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/generations">Generations</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/credits">Buy credits</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(event) => {
                            event.preventDefault()
                            signOut({
                                callbackUrl: `${window.location.origin}/login`,
                            })
                        }}
                    >
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
