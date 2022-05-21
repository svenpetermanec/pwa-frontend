export const getLocalStorageJwt = () => {
    const data = localStorage.getItem("jwt");

    return data ?? undefined;
};

export const setLocalStorageJwt = (jwt: string) => {
    localStorage.setItem("jwt", jwt);
};

export const deleteLocalStorageJwt = () => {
    localStorage.removeItem("jwt");
};
