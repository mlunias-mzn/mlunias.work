export async function logout() {
    return fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
            'Origin': 'http://localhost:3000',
            'Content-Type': 'application/json'
        },
        credentials: 'include'

    }).then(res => {
        if (res.ok) {
            return
        } else {
            return res.json().then((data) => {
                throw new Error(data?.message)
            })
        }
    })
}