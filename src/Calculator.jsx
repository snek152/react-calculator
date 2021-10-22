import React, { useState } from "react"
import $ from "jquery"

function Calculator() {
    const [number, setCount] = useState("0")
    const negate = () => {
        if (number.includes("-")) {
            setCount(number.slice(1))
        } else {
            setCount(`-${number}`)
        }
    }

    const appendNum = (num) => {
        if (isFinite(num) && number.length <= 20) {
            $("div>span").removeClass("text-red-600")
            if (number === "0") {
                setCount(num)
            } else {
                setCount(number + num)
            }
        } else if (number.length > 20) {
            $("div>span").addClass("text-red-600")
        }
    }
    $(window).one("keydown", (event) => {
        if (event.key === "Backspace") {
            if (number.slice(0, -1) === "") {
                setCount("0")
            } else {
                setCount(number.slice(0, -1))
            }
        }
    })
    $(window).one("keypress", (event) => {
        if (isFinite(event.key) && number.length <= 20) {
            $("div>span").removeClass("text-red-600")
            appendNum(event.key)
        } else if (number.length > 20) {
            $("div>span").addClass("text-red-600")
        }
        // } else if (event.key === "Backspace") {
        //     console.log("backspaced")
        //     if (number.slice(0, -1) === "") {
        //         setCount("0")
        //     } else {
        //         setCount(number.slice(0, -1))
        //     }
        // }
    })
    return (
        <div className="container flex flex-auto justify-center m-auto">
            <div className="bg-gray-900 p-5 rounded-3xl">
                <span className="border-0 w-80 block bg-transparent text-white text-right p-2 font-mono text-2xl m-1">{number}</span>
                <div className="container">
                    <div className="flex p-1">
                        <button className="calc-button" onClick={() => { setCount("0"); $("div>span").removeClass("text-red-600") }}>c</button>
                        <button className="calc-button" onClick={() => negate()}>±</button>
                        <button className="calc-button">%</button>
                        <button className="calc-button op-btn">÷</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>7</button>
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>8</button>
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>9</button>
                        <button className="calc-button op-btn">x</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>4</button>
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>5</button>
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>6</button>
                        <button className="calc-button op-btn">-</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>1</button>
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>2</button>
                        <button className="calc-button" onClick={(event) => appendNum(event.target.innerText)}>3</button>
                        <button className="calc-button op-btn">+</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button-lg calc-button" onClick={(event) => appendNum(event.target.innerText)}>0</button>
                        <button className="calc-button">.</button>
                        <button className="calc-button op-btn">=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator