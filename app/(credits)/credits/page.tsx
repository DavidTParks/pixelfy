import { DashboardShell } from "@/components/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Credits",
    description: "Credits page",
}

export default async function CreditsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    return (
        <DashboardShell>
            <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem] text-center mt-8">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Credits No Longer Available
                </h2>
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-center">
                    Pixelfy has shut down and is no longer selling credits.
                    Thank you for your support!
                </p>
            </div>
        </DashboardShell>
    )
}
