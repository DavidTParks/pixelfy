import { MjmlText } from "@faire/mjml-react"
import React from "react"

type TextProps = {
    maxWidth?: number
} & React.ComponentProps<typeof MjmlText>

export default function Text({ children, maxWidth, ...props }: TextProps) {
    if (maxWidth) {
        return (
            <MjmlText {...props} cssClass="text">
                <div style={{ maxWidth }}>{children}</div>
            </MjmlText>
        )
    } else
        return (
            <MjmlText {...props} cssClass="text">
                {children}
            </MjmlText>
        )
}
