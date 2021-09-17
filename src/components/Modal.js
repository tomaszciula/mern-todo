import React, { useState } from "react";

const Modal = () => {
    const [inputState, setInputState] = useState("")

    return(
        <div>
            <form>
            <label>
            <input value={inputState}>rege</input>
            </label>
            <input value={inputState}>aerge</input>
            <input value={inputState}>erg</input>
            </form>
        </div>
    )

}

export default Modal