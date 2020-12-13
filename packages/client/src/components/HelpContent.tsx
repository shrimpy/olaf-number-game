import React, { useCallback, useState } from "react";
import { HelpButton } from "./HelpButton";

export interface HelpContentProps {
    left: number;
    op: string;
    right: number;
}

const createPart = (num: number): any[] => {
    const parts: any[] = [];
    for (let i = 0; i < num; i++) {
        parts.push(<HelpButton value="☺" />);
    }
    if (num === 0) {
        parts.push(<span style={{ fontSize: "50px" }}>Nothing</span>);
    }
    return parts;
};

export const HelpContent = ({ left, op, right }: HelpContentProps) => {
    const leftPart = createPart(left);
    const rightPart = createPart(right);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div>{leftPart}</div>
            <div style={{ color: "brown", padding: "0 10px 20px 10px", fontSize: "50px" }}>{op}</div>
            <div>{rightPart}</div>
        </div>
    );
};