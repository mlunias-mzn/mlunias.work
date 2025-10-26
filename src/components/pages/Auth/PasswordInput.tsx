import { TbEye, TbEyeClosed, TbLock } from "react-icons/tb";
import TextInput from "../../modules/TextInput/TextInput";
import { useState } from "react";

export default function PasswordInput(props: {
    label?: string
} & React.ComponentProps<typeof TextInput>) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {
        label, ...inputProps
    } = props

    return (
        <TextInput
            {...inputProps}
            name={props.name ?? "password"}
            type={showPassword ? "text" : "password"}
            required={props.required === undefined && true}
            placeholder={props.placeholder ?? label ?? "パスワード"}
            startAdornment={props.startAdornment ?? <TbLock />}
            endAdornment={props.endAdornment ??
                <label
                    className="swap tooltip"
                    aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
                    data-tip={showPassword ? "非表示にする" : "表示する"}
                    aria-checked={showPassword}
                >
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => {
                            setShowPassword(e.target.checked)
                        }}
                    />
                    <TbEye className="swap-on" />
                    <TbEyeClosed className="swap-off" />
                </label>
            }
            aria-label={props["aria-label"] ?? label ?? "パスワード"}
        />
    )
}