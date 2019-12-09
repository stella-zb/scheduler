import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace === false) {
      setMode(mode)
      setHistory(prev => ([...prev, mode]))
    } else {
      setMode(mode)
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
