import clsx from "clsx"

export default function Progress(props: {
    value?: number
    max?: number
    color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
} & React.DetailedHTMLProps<React.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>) {
    const { value, max, color, className, ...progressProps } = props
    return (
        <progress
            {...progressProps}
            className={clsx(
                "progress",
                color == "neutral" && "progress-neutral",
                color == "primary" && "progress-primary",
                color == "secondary" && "progress-secondary",
                color == "accent" && "progress-accent",
                color == "info" && "progress-info",
                color == "success" && "progress-success",
                color == "warning" && "progress-warning",
                color == "error" && "progress-error",
                className
            )}
            value={value}
            max={max}
        />
    )
}