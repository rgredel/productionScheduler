import { useEffect, useState } from "react";

function useLocalState(defaultValue, key){
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);

        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}


export {useLocalState}
