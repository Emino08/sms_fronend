import axios from "axios";
import {
  paymentRequest,
  paymentSuccess,
  paymentFailed,
  paymentError,
} from "./feesPaymentSlice";

export const makePayment = (paymentData) => async (dispatch) => {
  dispatch(paymentRequest());

  try {
    // Make an API request to process the payment
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/FeesPayment`,
      paymentData,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    if (result.data.success) {
      dispatch(paymentSuccess(result.data.message));
    } else {
      dispatch(paymentFailed(result.data.message));
    }
  } catch (error) {
    dispatch(paymentError(error.message));
  }
};
