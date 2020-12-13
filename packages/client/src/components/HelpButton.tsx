import React, { useCallback, useState } from "react";

export interface HelpButtonProps {
    value: string;
}

export const HelpButton = ({ value }: HelpButtonProps) => {
    const [isClick, setIsClick] = useState(false);
    const onClick = useCallback(() => {
        setIsClick(!isClick);
    }, [isClick, setIsClick]);

    return <button onClick={onClick} style={{ fontSize: "30px", width: "60px", height: "60px", marginLeft: "10px", backgroundColor: isClick ? "gray" : "lightgreen" }}>{value}</button>
};