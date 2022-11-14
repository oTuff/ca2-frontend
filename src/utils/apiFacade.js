const URL = "https://tuff.systems/tomcat/BackEnd_CA2";

// const URL = "http://localhost:8080";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json();
}

function apiFacade() {

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    const loggedIn = () => {
        return getToken() != null;
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password) => {
        const options = makeOptions("POST", true, {username: user, password: password});
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
                console.log(res)
            })
    }

    const fetchData = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }
    const fetchDataAdmin = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    }

    const createUser = (user, password) => {
        const options = makeOptions("POST", null, {
            "userName": user, "userPass": password, "roles": [
                "user"
            ]
        });
        return fetch(URL + "/api/info/", options)
            .then(handleHttpErrors)
    }

    const updateUser = (user, password, role, userId) => {
        const options = makeOptions("PUT", null, {
            "userName": user, "userPass": password, "roles": [
                role
            ]
        });
        return fetch(URL + "/api/info/user/update/" + userId, options)
            .then(handleHttpErrors)
    }

    const deleteUser = async (id) => {
        fetch(URL + "/api/info/user/" + id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('DATA:', data);
                props.setUsers(props.users.filter((user) => user.id !== id))
            });
    }

    const makeOptions = (method, addToken, body) => {
        method = method ? method : 'GET';
        const opts = {
            method: method,
            headers: {
                ...(['PUT', 'POST'].includes(method) && {
                    "Content-type": "application/json"
                }),
                "Accept": "application/json"
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    const getUserRoles = () => {
        const token = getToken()
        if (token != null) {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }
    const getUserName = () => {
        const token = getToken()
        if (token != null) {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const username = decodedClaims.username
            return username
        } else return ""
    }
    const getUserId = () => {
        const token = getToken()
        if (token != null) {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const id = decodedClaims.id
            return id
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }


    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        fetchDataAdmin,
        getUserRoles,
        getUserName,
        getUserId,
        hasUserAccess
    }
}

const facade = apiFacade();
export default facade;