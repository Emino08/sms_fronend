import axios from "axios";
import {
 academicYearSuccess,
    academicYearFailed,
    academicYearError,
    academicYearRequest,
    resetAcademicYearStatus,
    setAcademicYearData,
    clearAcademicYearData,
} from "./academicYearSlice"; // Import actions from your academicYearSlice

export const createAcademicYear = (fields) => async (dispatch) => {
  dispatch(academicYearRequest());

  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/AcademicYear`,
        {...fields },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    if (result.data.message) {
        dispatch(academicYearFailed(result.data.message));
    } else {
      // You might want to dispatch a success action here if needed

      dispatch(academicYearSuccess(result.data))
    }
  } catch (error) {
    dispatch(academicYearError(error));
  }
};
export const getAllAcademicYears = (id) => async (dispatch) => {
  dispatch(academicYearRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/academicYears/${id}`,
    );
    if (result.data.message) {
      dispatch(academicYearFailed(result.data.message));
    } else {
      dispatch(academicYearSuccess(result.data));
    }
  } catch (error) {
    dispatch(academicYearError(error));
  }
};

export const updateAcademicYearFields =
  (id, fields, address) => async (dispatch) => {
    dispatch(academicYearRequest());

    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/${address}/${id}`,
        fields,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (result.data.message) {
        dispatch(academicYearFailed(result.data.message));
      } else {
        // You might want to dispatch a success action here if needed
      }
    } catch (error) {
      dispatch(academicYearError(error));
    }
  };

export const removeAcademicYear = (id, address) => async (dispatch) => {
  dispatch(academicYearRequest());

  try {
    const result = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`,
    );
    if (result.data.message) {
      dispatch(academicYearFailed(result.data.message));
    } else {
      // You might want to dispatch a success action here if needed
    }
  } catch (error) {
    dispatch(academicYearError(error));
  }
};
