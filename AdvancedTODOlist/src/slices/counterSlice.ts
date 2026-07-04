import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 1. Define State interface
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// 2. Create the Slice
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

// 3. Export actions and reducer
const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

export { increment, decrement, incrementByAmount, reset }
export default counterSlice.reducer;