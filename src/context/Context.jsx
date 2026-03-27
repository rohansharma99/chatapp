import React from "react";
import { createContext, useState } from "react";
import main from "../component/config/friday";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
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
    setResultData("");
    setRecentPrompt("");
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

    try {
      const response = await main(currentPrompt);

      // Guarantee it's a string before formatting
      const safeResponse =
        typeof response === "string"
          ? response
          : String(response ?? "Sorry, no response received.");

      const formattedResponse = formatResponse(safeResponse);

      if (prompt === undefined) {
        setPrevPrompt((prev) => [
          ...prev,
          { prompt: input, response: formattedResponse },
        ]);
        setRecentPrompt(input);
      }

      let newResponseArray = formattedResponse.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        delayPara(i, newResponseArray[i] + " ");
      }
    } catch (error) {
      console.error("API error:", error);
      setResultData("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const loadFromHistory = (historyItem) => {
    setRecentPrompt(historyItem.prompt);
    setShowresult(true);
    setResultData(historyItem.response);
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
    loadFromHistory,
  };

  return (
    <Context.Provider value={contextvalue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
