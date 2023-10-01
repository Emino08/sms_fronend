import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  response: null,
  paymentStatus: "idle",
};

const feesPaymentSlice = createSlice({
  name: "feesPayment",
  initialState,
  reducers: {
    paymentRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.response = null;
      state.paymentStatus = "loading";
    },
    paymentSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.response = action.payload;
      state.paymentStatus = "succeeded";
    },
    paymentFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.response = null;
      state.paymentStatus = "failed";
    },
    paymentError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.response = null;
      state.paymentStatus = "error";
    },
    resetPaymentStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
      state.paymentStatus = "idle";
    },
  },
});

export const {
  paymentRequest,
  paymentSuccess,
  paymentFailed,
  paymentError,
  resetPaymentStatus,
} = feesPaymentSlice.actions;

export const feesPaymentReducer = feesPaymentSlice.reducer;
