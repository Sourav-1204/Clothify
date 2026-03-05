
const storeInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const readFromLocalStorage = (key) => {
    const item = localStorage.getItem(key);

    try {
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
    }
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export {
    storeInLocalStorage,
    readFromLocalStorage,
    removeFromLocalStorage
}