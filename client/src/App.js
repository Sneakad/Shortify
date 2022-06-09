import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';
import Navbar from './Components/Navbar';
import loader from './Ripple-1s-224px.svg'

function App() {

  const [original, setOriginal] = useState("")
  const [shorturl, setShorturl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addData = () => {
    setIsLoading(true)
    axios.post('https://shortify96.herokuapp.com/create', { original: original }).then((result) => {
      console.log(result.data)

      setShorturl(result.data)
    }).finally(() => { setIsLoading(false) })
  }


  return (
    <div className="App">
      <Navbar />
      <div className="desc">
        <h1 className='sorti-head'>Shortify</h1>
        <p>
          Most link shorteners do too much.
        </p>
        <p>
          This one just makes your links shorter
        </p>
      </div>

      <div className="add">
        <input type="text" name="original" placeholder="Paste your link here" onChange={(e) => { setOriginal(e.target.value) }} />
        <button onClick={addData}>Generate</button>
      </div>
      <div className='generated'>
        <h1>Your link will appear here</h1>
        {isLoading ? <img src={loader} alt="Loading ..." /> : <></>}
        {!shorturl ? <></> : <a href={`https://shortify96.herokuapp.com/${shorturl}`} target="_blank" className='genlink' > shortify96.herokuapp.com/{shorturl}</a>}
        {!shorturl ? <></> : <CopyToClipboard text={`https://shortify96.herokuapp.com/${shorturl}`}>
          <button id='copy'>Copy</button>
        </CopyToClipboard>}

      </div>

      <footer>
        Made with ❤️ by <a className="aditya" href="https://www.linkedin.com/in/aditya-mondal-5a84751bb/" target="_blank">Aditya</a>
      </footer>
    </div>

  );
}

export default App;
