// const base_api = process.env.BASE_API || "http://localhost:8080/api";
const base_api = "http://localhost:8080/api";

export default async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const isFormData = options.body instanceof FormData;

    let headers = { ...options.headers };
    if (!isFormData) {
        headers = {
            "Content-Type": "application/json",
            ...headers,
        };
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${base_api}/${endpoint}`, {
        ...options,
        headers,
    });

    let data;
    try {
        data = await response.json();
    } catch (err) {
        console.log(err)
        data = null;
    }

    if (!response.ok) {
        throw data?.message || `Error in ${endpoint}`;
    }

    return data;
};