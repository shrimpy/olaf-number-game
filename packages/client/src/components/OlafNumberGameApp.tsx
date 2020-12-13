import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { HelpContent } from "./HelpContent";

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
    const goodAudio1 = useMemo(() => new Audio("./i-am-wonderful.mp3"), []);
    const goodAudio2 = useMemo(() => new Audio("./i-love-it-even-more.mp3"), []);
    const badAudio = useMemo(() => new Audio("./nope.mp3"), []);

    useEffect(() => {
        goodAudio1.load();
        goodAudio2.load();
        badAudio.load();
    }, []);

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
        for (let i = 0; i < 3; i++) {
            rcs.push(r + Math.ceil(Math.random() * 10));
        }
        if (rcs.indexOf(r) === -1) {
            rcs.push(r);
        }

        shuffleArray(rcs);
        setResultCans(rcs);
    }, [setNum1, setNum2, setOp,]);

    useEffect(() => newCal(), [newCal]);

    const onTest = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
        let expect = 0;
        if (op === "+") expect = num1 + num2
        else expect = num1 - num2

        const actual = parseInt(e.currentTarget.dataset.result!);

        if (expect === actual) {
            const rand = Math.floor(Math.random() * 10);
            if (rand % 2 === 0) {
                goodAudio1.play();
            } else {
                goodAudio2.play();
            }
            setResult(result + 1);
            newCal();
        } else {
            badAudio.play();
            setResult(result === 0 ? 0 : result - 1);
        }

        setShowHelp(false);
    }, [num1, num2, result, newCal, setResultCans, goodAudio1, goodAudio2, badAudio]);

    const onHelp = useCallback(() => setShowHelp(!showHelp), [showHelp, setShowHelp]);
    const onReset = useCallback(() => {
        newCal();
        setResult(0);
    }, [newCal, setResult]);

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
                        return <img src={val} style={{ maxWidth: "200px", maxHeight: "200px" }} />;
                    }
                })}
                {result === 0 && <h2>Want to see a snowman?</h2>}
                {result >= imgs.length && <div><button style={{ height: "55px", marginLeft: "50px", fontSize: "30px" }} onClick={onReset}>Well Done! Let's do it again!</button></div>}
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
                                <button onClick={onTest} data-result={val} style={{ width: "50px", height: "55px", marginLeft: "10px", fontSize: "30px" }}>{val}</button>)
                        }
                        <button onClick={onHelp} style={{ width: "200px", height: "55px", marginLeft: "50px" }}>Help</button>
                    </h1>
                    {showHelp && <HelpContent left={num1} op={op} right={num2} />}
                </div>}
        </>
    );
};

const shuffleArray = (a: any[]) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}