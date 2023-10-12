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
      dispatch(paymentFailed(result.data.message));
    } else {
      dispatch(paymentSuccess(result.data));
    }
  } catch (error) {
    dispatch(paymentError(error.message));
  }
};

export const getPaymentReport = () => async (dispatch) => {
  dispatch(paymentRequest());

  try {
    // Make an API request to process the payment
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/AllFeesPayments`,
    );

    if (result.data.message) {
      dispatch(paymentFailed(result.data.message));
    } else {
      dispatch(paymentSuccess(result.data));
    }
  } catch (error) {
    dispatch(paymentError(error.message));
  }
};

export const getPaymentReportByClassId =
  (selectedTerm, classId) => async (dispatch) => {
    dispatch(paymentRequest());

    try {
      // Make an API request to process the payment
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}$/FeePaymentReport/{selectedTerm}/${classId}`,
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

export const getPaymentReportByStudentId = (studentId) => async (dispatch) => {
  dispatch(paymentRequest());

  try {
    // Make an API request to process the payment
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/FeePaymentReport/${studentId}`,
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

export const getPaymentReportByTermAndClassId =
  (term, classId) => async (dispatch) => {
    dispatch(paymentRequest());

    try {
      // Make an API request to process the payment
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/FeePaymentReport/${term}/${classId}`,
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

export const getPaymentReportByTerm = (term) => async (dispatch) => {
  dispatch(paymentRequest());

  try {
    // Make an API request to process the payment
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/FeePaymentReport/${term}`,
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

export const studentPaymentReport = (studentId) => async (dispatch) => {
  dispatch(paymentRequest());

  try {
    // Make an API request to process the payment
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/StudentPaymentReport/${studentId}`,
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
