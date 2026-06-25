
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 1. הגדרת הטייפ של הסטייט
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// 2. יצירת ה-Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  },
});

// 3. ייצוא האקשנים והרדיוסר
const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;


export { increment, decrement, incrementByAmount, reset }
export default counterSlice.reducer;