import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { incrementBy } from "../my-counter/myCounterSlice";
import { decrement, increment, selectMyCount } from "./myCounterSlice";

export function MyCounter() {
    const myCount = useAppSelector(selectMyCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('1');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div>
            <input 
                onChange={(e) => setIncrementAmount(e.target.value)} 
                type="number" 
                placeholder="increment by..." />
            <button onClick={() => dispatch(incrementBy(incrementValue))}>Increment by {incrementValue}</button>
            <button onClick={() => dispatch(decrement())}>
                -
            </button>
            <span>{myCount}</span>
            <button onClick={() => dispatch(increment())}>
                +
            </button>
        </div>
  );
}
