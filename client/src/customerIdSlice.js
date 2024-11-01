import { createSlice } from '@reduxjs/toolkit';

const customerIdSlice = createSlice({
  name: 'customerId',
  initialState: '',
  reducers: {
    setCustomerId: (state, action) => action.payload
  }
});

export const { setCustomerId } = customerIdSlice.actions;
export default customerIdSlice.reducer;