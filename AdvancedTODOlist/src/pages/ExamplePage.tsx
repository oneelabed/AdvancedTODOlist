import { useDispatch,useSelector } from "react-redux";
import {type AppDispatch } from "../store";
 import { increment, decrement, incrementByAmount,reset } from "../slices/counterSlice";


function ExamplePage() {
const count = useSelector((state: any) => state.counter.value);
const dispatch = useDispatch<AppDispatch>();

  return (
 <>
 <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h2>מונה גלובלי: {count}</h2>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => dispatch(increment())}>הוסף 1 +</button>
        <button onClick={() => dispatch(decrement())}>הורד 1 -</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>הוסף 5 +</button>
        <button onClick={() => dispatch(reset())}>אפס</button>
      </div>
    </div>
 
 </>
);
}

export default ExamplePage;
