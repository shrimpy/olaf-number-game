import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { HelpButton } from "./HelpButton";

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
    const [op, setOp] = useState("+");
    const [resultCans, setResultCans] = useState<number[]>([]);
    const [result, setResult] = useState(0);
    const [showHelp, setShowHelp] = useState(false);


    const newCal = useCallback(() => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        let r = 0;
        if (n1 >= n2) {
            setNum1(n1);
            setNum2(n2);
            setOp("+");
            r = n1 + n2;
        } else {
            setNum1(n2);
            setNum2(n1);
            setOp("-");
            r = n2 - n1;
        }

        const rcs = [];
        let added = false;
        for (let i = 0; i < 3; i++) {
            const rand = Math.ceil(Math.random() * 10);
            rcs.push(r + rand);

            if (!added && rand % 2 === 0) {
                rcs.push(r);
                added = true;
            }
        }

        if (rcs.length < 4 && rcs.indexOf(r) === -1) {
            rcs.push(r);
        }

        setResultCans(rcs);
    }, [setNum1, setNum2, setOp,]);

    useEffect(() => newCal(), [newCal]);

    const onTest = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
        let expect = 0;
        if (op === "+") expect = num1 + num2
        else expect = num1 - num2

        const actual = parseInt(e.currentTarget.dataset.result!);

        if (expect === actual) {
            setResult(result + 1);
            newCal();
        } else {
            setResult(result === 0 ? 0 : result - 1);
        }

        setShowHelp(false);
    }, [num1, num2, result, newCal, setResultCans]);

    const onHelp = useCallback(() => setShowHelp(!showHelp), [showHelp, setShowHelp]);
    const onReset = useCallback(() => {
        newCal();
        setResult(0);
    }, [newCal, setResult]);

    const HelpContent: any = useMemo(() => {
        if (!showHelp) {
            return null;
        }

        const he = [];
        for (let i = 0; i < num1; i++) {
            he.push(<HelpButton value="☺" />);
        }
        if (num1 === 0) {
            he.push(<span style={{ margin: "10px", fontSize: "30px" }}>Nothing</span>);
        }

        he.push(<span style={{ margin: "10px", fontSize: "30px" }}>{op}</span>);
        for (let i = 0; i < num2; i++) {
            he.push(<HelpButton value="☺" />);
        }

        if (num2 === 0) {
            he.push(<span style={{ margin: "10px", fontSize: "30px" }}>Nothing</span>);
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
                {result >= imgs.length && <div><button onClick={onReset}><h2>Well Done! Let's do it again</h2></button></div>}
            </div>
            {result < imgs.length &&
                <div>
                    <h1 style={{ margin: "30px" }}>
                        <span style={{ margin: "10px" }}>
                            {num1}
                        </span>
                        <span style={{ color: "brown", paddingRight: "10px" }}>{op}</span>
                        <span style={{ margin: "10px" }}>
                            {num2}
                        </span>
                        <span style={{ color: "blue", paddingRight: "10px" }}>=</span>
                        {
                            resultCans.map(val =>
                                <button onClick={onTest} data-result={val} style={{ width: "50px", height: "55px", marginLeft: "10px" }}>{val}</button>)
                        }
                        <button onClick={onHelp} style={{ width: "200px", height: "55px", marginLeft: "50px" }}>Help</button>
                    </h1>
                    {HelpContent}
                </div>}
        </>
    );
};