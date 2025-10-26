export async function logout() {
    return fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
            'Origin': 'http://localhost:3000',
            'Content-Type': 'application/json'
        },
        credentials: 'include'

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