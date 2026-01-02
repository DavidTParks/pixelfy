import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Create",
            href: "/dashboard",
        },
        {
            title: "Examples",
            href: "/examples/pixel-background",
        },
    ],
    sidebarNav: [
        {
            title: "Create",
            href: "/dashboard",
            icon: "terminal",
        },
        {
            title: "Generations",
            href: "/dashboard/generations",
            icon: "imagePlus",
        },
        // {
        //     title: "Settings",
        //     href: "/dashboard/settings",
        //     icon: "settings",
        // },
    ],
}
