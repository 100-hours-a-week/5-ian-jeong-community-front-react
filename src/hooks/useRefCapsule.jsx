import { useRef, useCallback } from "react";



const useRefCapsule = (initValue) => {
    const dataRef = useRef(initValue);
    
    const getData = useCallback(() => {
        return dataRef.current;
    }, []);

    const setData = useCallback((newValue) => {
        dataRef.current = newValue;
    }, []);
    
    return {
        get: getData,
        set: setData
    }
}

export default useRefCapsule;