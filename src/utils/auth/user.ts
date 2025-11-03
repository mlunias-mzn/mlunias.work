export async function user(): Promise<Record<string, any>> {
    return fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
            'Origin': 'http://localhost:3000',
            'Content-Type': 'application/json'
        },
        credentials: 'include'

    }).then(res => {
        if (res.ok) {
            return res.json().then((data) => {
                if (!data?.data) {
                    throw new Error(data?.message)
                }
                return data?.data
            })
        } else {
            return res.json().then((data) => {
                throw new Error(data?.message)
            })
        }
    })
}