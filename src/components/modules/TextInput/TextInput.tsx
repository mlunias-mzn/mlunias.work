import clsx from "clsx";
import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
    help?: string
    ghost?: boolean
    inputSize?: "xs" | "sm" | "md" | "lg" | "xl"
    color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
    startAdornment?: ReactNode
    endAdornment?: ReactNode
}

export default function TextInput(props: TextInputProps) {
    const { label, help, ...inputProps } = props

    if (label || help) {
        return (
            <fieldset className="fieldset">
                {label && <legend className="fieldset-legend">{label}</legend>}
                <InputInner {...inputProps} />
                {help && <p className="label">{help}</p>}
            </fieldset>
        )
    } else {
        return <InputInner {...inputProps} />
    }

}

function InputInner(props: TextInputProps) {
    const {
        startAdornment,
        endAdornment,
        ghost,
        inputSize,
        color,
        ...inputProps
    } = props

    return (
        <label
            className={clsx(
                "input",
                ghost && "input-ghost",
                inputSize == "xs" && "input-xs",
                inputSize == "sm" && "input-sm",
                inputSize == "md" && "input-md",
                inputSize == "lg" && "input-lg",
                inputSize == "xl" && "input-xl",
                color == "neutral" && "input-neutral",
                color == "primary" && "input-primary",
                color == "secondary" && "input-secondary",
                color == "accent" && "input-accent",
                color == "info" && "input-info",
                color == "success" && "input-success",
                color == "warning" && "input-warning",
                color == "error" && "input-error",
            )}
        >
            {startAdornment}
            <InputField {...inputProps} />
            {endAdornment}
        </label>
    )
}

function InputField(props: TextInputProps) {
    return (
        <input {...props} />
    )
}