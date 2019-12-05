import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode]=useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // update the mode with the given mode
    setMode(newMode)  
    // if replace is false which mean true, update the history with the given mode
    if (replace === false) {
      setHistory(prev => ([...prev, newMode]))
    }
  }

  const back = () => {
    // remove the last item in history array
    history.pop()
    // check if history array length is greater than 1 to keep the initial mode
    if (history.length < 1) return
    // update Mode with the last element in history array
    setMode(history[history.length - 1])
  }

  return {
    mode,
    transition,
    back
  }
}
