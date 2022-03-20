import react from 'react';
import { useState } from 'react';
import axios from 'axios';




const Test = () => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const example = { input: input }
        axios.post('/vpresult/vpresult', example)

    }
    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)}></input>
            <button value="Submit" onClick={handleSubmit}>text</button>
        </div>
    )
}

export default Test;