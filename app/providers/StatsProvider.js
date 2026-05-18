"use client"
import { useCallback, useState } from "react";
import { StatesContext } from "../context";


const StatsProvider = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0)

    const refreshStats = useCallback(() => {
        setRefreshKey((prev) => prev + 1)
    }, [])

    return (
        <StatesContext.Provider value={{ refreshKey, refreshStats }}>
            {children}
        </StatesContext.Provider>
    );
};

export default StatsProvider;