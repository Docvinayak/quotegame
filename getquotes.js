import React, { useEffect, useState } from "react";

function Typing_game() {
  const [quotes, setQuotes] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [starttime, setStartTime] = useState(null);
  const [endtime, setEndTime] = useState(null);
  const [quotesplay, setQuotesPlay] = useState(0);
  const [inputtext, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [score ,setScore] = useState(0);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((quotes) => {
        setQuotes(quotes);
        shuffle(quotes);
        setQuotes(quotes.slice(0, 10));
        setIsLoading(false);
      });
  }, []);

  const shuffle = (quotes) => {
    for (var i = quotes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = quotes[i];
      quotes[i] = quotes[j];
      quotes[j] = temp;
    }
  };

  const Typing = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
    if (quotesplay === 0) {
      console.log(quotesplay);
      setStartTime(Date.now());
      console.log(starttime);
    }
  };

  useEffect(() => {setResult(Math.round((endtime - starttime) / 1000))
  ;},[endtime]);

  const check = (e) => {
    console.log(quotesplay);
    if (e.keyCode === 13) {
      if (e.target.value === quotes[quotesplay].text) {
        console.log("Correct");
        setScore(score + 1);
      } else {
        console.log("Incorrect");
      }
      setInputText("");

      if (quotesplay < quotes.length - 1) {
        setQuotesPlay(quotesplay + 1);
      }else{
        setEndTime(Date.now());
        setResult(Math.round((endtime - starttime) / 1000));
        alert("game over")
      }
    }
  };

  if (isloading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div id="gameContainer">
          <div id="quoteDisplay">{quotes[quotesplay].text}</div>
          <input
            type="text"
            id="typingInput"
            value={inputtext}
            onChange={Typing}
            onKeyDown={check}
          />
          <div id="scoreDisplay">Time:{result}</div>
          <div id="timeDisplay">
            Score:{score}
          </div>
          <div id="avgtimeDisplay"></div>
        </div>
      </div>
    );
  }
}

export default Typing_game;
