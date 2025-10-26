import PasswordValidator from "password-validator"
import { isStrongPassword } from "validator"

export async function signup(username: string, password: string) {
    return fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
            'Origin': 'http://localhost:3000',
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })

    }).then(res => {
        if (res.ok) {
            return res.json().then((data) => {
                if (data.token) {
                    return data.token
                } else {
                    throw new Error(data?.message)
                }
            })
        } else {
            return res.json().then((data) => {
                throw new Error(data?.message)
            })
        }
    })
}

export async function checkIsUsernameConflict(username: string): Promise<boolean | void> {
    return fetch("http://localhost:3000/api/username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username
        }),
    }).then(res => {
        if (res.ok) {
            return res.json().then((data) => {
                if (data.result == 1) {
                    return true
                } else if (data.result == 0) {
                    return false
                } else if (data.result == -1) {
                    return undefined
                } else {
                    throw new Error(data?.message)
                }
            })
        } else {
            return res.json().then((data) => {
                throw new Error(data?.message)
            })
        }
    })
}

export function validateUsername(username: string): boolean | any[] {
    const schema = new PasswordValidator()

    schema
        .usingPlugin((username) => {
            return (
                typeof username == "string" && /^[a-zA-Z0-9_.]+$/.test(username)
            )
        }, "使用できない文字が含まれています")
        .is().min(4, "4文字以上で入力してください")
        .is().max(32, "32文字以下で入力してください")

    return schema.validate(username, { details: true })
}

export function validatePassword(password: string): boolean | any[] {
    const schema = new PasswordValidator()

    schema
        .has().not().spaces(1, "使用できない文字が含まれています")
        .is().min(16, "16文字以上で入力してください")
        .is().max(128, "128文字以下で入力してください")
        .usingPlugin((password) => {
            return passwordStrength(password) > 50
        }, "パスワードが弱すぎます")

    return schema.validate(password, { details: true })
}

export function passwordStrength(password: string): number {
    return Math.min(isStrongPassword(password, {
        minLength: 16,
        returnScore: true,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10
    }) * 2, 100)
}
