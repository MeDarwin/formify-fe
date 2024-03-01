import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../reducer/slices/counterSlice";
export const Index = () => {
  const count = useSelector((state) => state.counter.value);
  console.log(count);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold">Counter {count}</p>
      <button className="text-3xl" onClick={() => dispatch(increment())}>
        +
      </button>
      <button className="text-3xl" onClick={() => dispatch(decrement())}>
        -
      </button>
      <button className="text-3xl" onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
};
