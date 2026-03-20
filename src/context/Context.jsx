import React from "react";
import { createContext, useState } from "react";
import main from "../component/config/friday";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]); // ✅ objects store karega
  const [showResult, setShowresult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowresult(false);
    setResultData("");      // ✅ Clear result
    setRecentPrompt("");    // ✅ Clear prompt
  };

  const formatResponse = (response) => {
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    return newResponse.split("*").join("</br>");
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowresult(true);

    const currentPrompt = prompt !== undefined ? prompt : input;

    // ✅ API call karo
    const response = await main(currentPrompt);
    const formattedResponse = formatResponse(response);

    // ✅ Prompt + Response dono save karo (sirf naye prompt ke liye)
    if (prompt === undefined) {
      setPrevPrompt((prev) => [
        ...prev,
        { prompt: input, response: formattedResponse }, // ✅ Object save karo
      ]);
      setRecentPrompt(input);
    }

    // ✅ Typing effect
    let newResponseArray = formattedResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      delayPara(i, newResponseArray[i] + " ");
    }

    setLoading(false);
    setInput("");
  };

  // ✅ History load karo — koi API call nahi!
  const loadFromHistory = (historyItem) => {
    setRecentPrompt(historyItem.prompt);
    setShowresult(true);
    setResultData(historyItem.response); // Purana response dikhao
  };

  const contextvalue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    loadFromHistory, // ✅ New function export karo
  };

  return (
    <Context.Provider value={contextvalue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
