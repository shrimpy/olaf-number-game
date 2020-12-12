import React, { useCallback, useEffect, useMemo, useState } from "react";

export interface HelloProps { }

const imgs = [
    "./olaf1.jpeg",
    "./olaf2.jpeg",
    "./olaf3.jpeg",
    "./olaf4.jpg",
    "./olaf5.jpg",
    "./olaf6.png",
    "./olaf7.jpeg",
    "./olaf8.jpeg",
    "./olaf9.webp",
    "./olaf10.png",
];

export const OlafNumberGameApp = () => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [num, setNum] = useState<number>(0);
    const [op, setOp] = useState("+");
    const [result, setResult] = useState(0);
    const [showHelp, setShowHelp] = useState(false);


    const newCal = useCallback(() => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        if (n1 >= n2) {
            setNum1(n1);
            setNum2(n2);
            setOp("+");
        } else {
            setNum1(n2);
            setNum2(n1);
            setOp("-");
        }

        setNum(0);
    }, [setNum, setNum1, setNum2, setOp,]);

    useEffect(() => newCal(), [newCal]);

    const onTest = useCallback(() => {
        let actual = 0;
        if (op === "+") actual = num1 + num2
        else actual = num1 - num2

        if (actual === num) {
            setResult(result + 1);
            newCal();
        } else {
            setResult(result === 0 ? 0 : result - 1);
        }

        setShowHelp(false);
    }, [num1, num2, num, result, newCal]);

    const onHelp = useCallback(() => setShowHelp(true), [setShowHelp]);

    const HelpContent: any = useMemo(() => {
        if (!showHelp) {
            return null;
        }

        const he = [];
        if (op === "+") {
            for (let i = 0; i < num1; i++) {
                he.push(<span style={{ margin: "10px", fontSize: "30px", color: "purple" }}>O</span>);
            }
            he.push(<span style={{ margin: "10px", fontSize: "30px" }}>{op}</span>);
            for (let i = 0; i < num2; i++) {
                he.push(<span style={{ margin: "10px", fontSize: "30px", color: "blue" }}>O</span>);
            }
        } else {
            for (let i = 0; i < num1; i++) {
                he.push(<span style={{ margin: "10px", fontSize: "30px", color: "purple", backgroundColor: (i < num2 ? "gray" : "") }}>O</span>);
            }
        }

        return he;

    }, [showHelp, num1, num2, op]);

    return (
        <>
            <h1>
                <div style={{ backgroundColor: "gray" }}>
                    <span style={{ color: "blue", paddingRight: "10px" }}>Welcome</span>
                    <span style={{ color: "yellow", paddingRight: "10px" }}>to</span>
                    <span style={{ color: "white", paddingRight: "10px" }}>Olaf</span>
                    <span style={{ color: "orange", paddingRight: "10px" }}>number</span>
                    <span style={{ color: "red", paddingRight: "10px" }}>game!</span>
                </div>
            </h1>
            <div>
                {imgs.map((val, idx) => {
                    if (idx < result) {
                        return <img src={val} width="200px" />;
                    }
                })}
                {result === 0 && <h2>Want to see a snow man?</h2>}
                {result >= imgs.length && <h2>Well done!</h2>}
            </div>
            <h1 style={{ margin: "30px" }}>
                <span style={{ margin: "10px" }}>
                    {num1}
                </span>
                <span style={{ color: "brown", paddingRight: "10px" }}>{op}</span>
                <span style={{ margin: "10px" }}>
                    {num2}
                </span>
                <span style={{ color: "blue", paddingRight: "10px" }}>=</span>
                <input
                    value={num}
                    onChange={e => setNum(parseInt(e.currentTarget.value) || 0)}
                    style={{ margin: "10px", width: "100px", height: "50px" }}
                />
                <button onClick={onTest} style={{ width: "200px", height: "55px", marginLeft: "50px" }}>Test</button>
                <button onClick={onHelp} style={{ width: "200px", height: "55px", marginLeft: "50px" }}>Help</button>
            </h1>
            {HelpContent}
        </>
    );
};