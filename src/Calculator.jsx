import React, { useEffect, useState } from "react"
import $ from "jquery"
import copy from "copy-to-clipboard"
import { Tooltip } from "bootstrap"
import { Link } from "react-router-dom"

function Calculator() {
    const [number, setCount] = useState("0")
    const negate = () => {
        if (number.includes("-")) {
            setCount(number.slice(1))
        } else {
            setCount(`-${number}`)
        }
    }

    const appendNum = (num, event) => {
        if ((event || isFinite(num)) && (number.length <= 20 || !number.length)) {
            $("div>span").removeClass("text-red-600")
            if ((number === "0") || number.length === undefined || checkState) {
                setCount(num)
                setCheckState(false)
            } else if (number === "-0") {
                setCount(`-${num}`)
                setCheckState(false)
            }
            else {
                setCount(number + num)
            }
            if (event) {
                $(event).focus()
            }
            else {
                [...document.querySelectorAll(".num-btn")]
                    .filter(a => a.textContent.includes(num))
                    .forEach(a => { $(a).focus() })
            }
        } else if (number.length > 20) {
            $("div>span").addClass("text-red-600")
        }
    }

    const saveForOp = (op, event) => {
        setFirstNum(number)
        setCurrentOp(op)
        $(".op-btn").removeClass("active")
        setCheckState(true)
        if (event) {
            $(event.target).addClass("active")
        } else {
            [...document.querySelectorAll(".op-btn")]
                .filter(a => a.textContent.includes(op))
                .forEach(a => { $(a).addClass("active") })
        }
    }

    const calculateNum = (op) => {
        switch (op) {
            case "+":
                setCount((parseFloat(firstNum) + parseFloat(number)).toString())
                break
            case "-":
                setCount((parseFloat(firstNum) - parseFloat(number)).toString())
                break
            case "×":
                setCount((parseFloat(firstNum) * parseFloat(number)).toString())
                break
            case "÷":
                setCount((parseFloat(firstNum) / parseFloat(number)).toString())
                break
            default:
                break
        }
        $(".op-btn").removeClass("active")
    }

    const convertToFloat = () => {
        if (!number.includes(".")) {
            setCount(number + ".")
        }
    }

    const copyNumber = () => {
        copy(number)
        $(".bi-clipboard path:nth-child(2)").addClass("opacity-100")
        setTimeout(() => { $(".bi-clipboard path:nth-child(2)").removeClass("opacity-100") }, 1500)
    }

    const saveURL = () => {
        copy(window.location + "?number=" + number)
    }
    $(".calc-button").attr("tabindex", "-1").attr("type", "button")
    const [currentOp, setCurrentOp] = useState(null)
    const [firstNum, setFirstNum] = useState("0")
    const [checkState, setCheckState] = useState(false)

    $(window).one("keydown", (event) => {
        $("calc-button").trigger("blur")
        if (event.key === "Backspace") {
            if (number.slice(0, -1) === "") {
                setCount("0")
            } else {
                setCount(number.slice(0, -1))
            }
        } else if (event.key === "Enter") {
            calculateNum(currentOp)
        }
    })
    $(window).one("keypress", (event) => {
        if (isFinite(event.key) && number.length <= 16) {
            $("div>span").removeClass("text-red-600").removeClass("dark:text-red-600")
            console.log($("div>span").attr("class"))
            appendNum(event.key)
        } else if (number.length > 16) {
            console.log($("div>span").attr("class"))
            $("div>span").addClass("text-red-600").addClass("dark:text-red-600")
        } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
            saveForOp(event.key)
        } else if (event.key === "=") {
            calculateNum(currentOp)
        } else if (event.key === ".") {
            convertToFloat()
        }
    })

    useEffect(() => {
        const urlnum = new URLSearchParams(window.location.search)
        if (urlnum.get("number")) setCount(urlnum.get("number"))
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle=tooltip]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl)
        })
    }, [])

    useEffect(() => {
        const toggleSwitch = document.querySelector('.form-switch input[type="checkbox"]');
        const currentTheme = localStorage.getItem('mode');

        if (currentTheme) {
            document.body.setAttribute('class', currentTheme);

            if (currentTheme === 'dark') {
                toggleSwitch.checked = true;
            }
        }

        function switchTheme(e) {
            if (e.target.checked) {
                document.body.setAttribute("class", 'dark');
                localStorage.setItem('mode', 'dark');
            }
            else {
                document.body.setAttribute("class", 'light');
                localStorage.setItem('mode', 'light');
            }
        }

        toggleSwitch.addEventListener('change', switchTheme, false);
    })


    return (
        <div className="container flex flex-auto justify-center items-center m-auto h-screen">
            <div className="dark:bg-gray-900 bg-gray-200 p-5 rounded-3xl" style={{ aspectRatio: "304 / 402" }}>
                <span className="border-0 w-64 block bg-transparent dark:text-white text-black text-right p-2 font-mono text-2xl m-1">{number}</span>
                <div className="container p-0" style={{ aspectRatio: "264/306" }}>
                    <div className="flex p-1">
                        <button className="calc-button ctrl-btn" onClick={() => { setCount("0"); $("div>span").removeClass("text-red-600").removeClass("dark:text-red-600"); setCurrentOp(null); setFirstNum("0"); $(".op-btn").removeClass("active") }}>c</button>
                        <button className="calc-button ctrl-btn" onClick={() => negate()}>±</button>
                        <button className="calc-button ctrl-btn" onClick={() => setCount((parseFloat(number) / 100).toString())}>%</button>
                        <button className="calc-button op-btn" onClick={(event) => saveForOp(event.target.innerText)}>÷</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>7</button>
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>8</button>
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>9</button>
                        <button className="calc-button op-btn" onClick={(event) => saveForOp(event.target.innerText)}>×</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>4</button>
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>5</button>
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>6</button>
                        <button className="calc-button op-btn" onClick={(event) => saveForOp(event.target.innerText)}>-</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>1</button>
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>2</button>
                        <button className="calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>3</button>
                        <button className="calc-button op-btn" onClick={(event) => saveForOp(event.target.innerText)}>+</button>
                    </div>
                    <div className="flex p-1">
                        <button className="calc-button-lg calc-button num-btn" onClick={(event) => appendNum(event.target.innerText)}>0</button>
                        <button className="calc-button num-btn" onClick={() => convertToFloat()}>.</button>
                        <button className="calc-button op-btn" onClick={() => calculateNum(currentOp)}>=</button>
                    </div>
                    <div className="container flex justify-center gap-4">
                        <Link to="/scientific" className="calc-link">Scientific</Link>
                        <div className="form-switch form-check">
                            <input className="form-check-input" type="checkbox" role="switch" />
                        </div>
                        <button type="button" className="text-blue-600" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Copy Number" onClick={() => copyNumber()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" className="opacity-0 transition-opacity duration-300" />
                            </svg>
                        </button>
                        <button type="button" className="text-blue-600" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Save URL" onClick={() => saveURL()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator