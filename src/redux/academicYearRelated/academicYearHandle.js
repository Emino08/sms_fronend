import axios from "axios";
import {
    academicYearSuccess,
    academicYearFailed,
    academicYearError,
    academicYearRequest,
    academicYearDetailsSuccess,
    clearStatusMessage
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
        dispatch(academicYearSuccess(result.data.message));
    } else {
      // You might want to dispatch a success action here if needed
        dispatch(clearStatusMessage());
      dispatch(academicYearFailed(result.data))

    }
  } catch (error) {
      const errData = error.response.data.error;
    dispatch(academicYearError(errData));
  }
};
export const getAllAcademicYears = () => async (dispatch) => {
  dispatch(academicYearRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/AllAcademicYears`,
    );
    if (result.data.message) {
      dispatch(academicYearFailed(result.data.message));
    } else {
      dispatch(academicYearDetailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(academicYearError(error));
  }
};

export const setAcademicYear = (academicYearName) => async (dispatch) => {
    dispatch(academicYearRequest());

    try {
        const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/SelectedAcademicYear`,
        {...academicYearName
        }
        );
        if (result.data.message) {
        dispatch(academicYearSuccess(result.data.message));
        } else {
        dispatch(academicYearFailed(result.data));
        }
    } catch (error) {
        const errData = error.response.data.error;
        dispatch(clearStatusMessage());
        dispatch(academicYearError(errData));

    }
}

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
