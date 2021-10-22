import React from "react"

function Calculator() {
    let number = 0
    return (
        <div className="container flex flex-auto justify-center">
            <div className="bg-red-200 p-5">
                <input readOnly disabled className="border-0 bg-blue-400 rounded-md text-right p-2 font-mono text-xl m-1" value={number} />
                <div className="container">
                    <div className="flex p-1">
                        <button className="calc-button">c</button>
                        <button className="calc-button">+/-</button>
                        <button className="calc-button">%</button>
                        <button className="calc-button">÷</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button">7</button>
                        <button className="calc-button">8</button>
                        <button className="calc-button">9</button>
                        <button className="calc-button">x</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button">4</button>
                        <button className="calc-button">5</button>
                        <button className="calc-button">6</button>
                        <button className="calc-button">-</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button">1</button>
                        <button className="calc-button">2</button>
                        <button className="calc-button">3</button>
                        <button className="calc-button">+</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button-lg calc-button">0</button>
                        <button className="calc-button">.</button>
                        <button className="calc-button">=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator