export async function login(body: { username: string, password: string }): Promise<string | void> {
    return fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            'Origin': 'http://localhost:3000',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            username: body.username,
            password: body.password
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