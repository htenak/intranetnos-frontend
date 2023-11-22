import { intranetApi } from "src/api";
import {
  resetCareerProfessor,
  resetColleagueProfessor,
  resetCycleProfessor,
  setCareerProfessorErrorMessage,
  setCareersProfessor,
  setColleagueProfessorErrorMessage,
  setColleaguesProfessor,
  setCycleProfessorErrorMessage,
  setCyclesProfessor,
} from "../academic";

export const getAllCareersProfessor = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/professor/careers`);
      dispatch(setCareersProfessor(data.data));
    } catch (error) {
      dispatch(setCareerProfessorErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCareerProfessor());
      }, 50);
    }
  };
};

export const getAllCyclesProfessor = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/professor/cycles`);
      dispatch(setCyclesProfessor(data.data));
    } catch (error) {
      dispatch(setCycleProfessorErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCycleProfessor());
      }, 50);
    }
  };
};

export const getAllColleaguesProfessor = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/professor/colleagues`);
      dispatch(setColleaguesProfessor(data.data));
    } catch (error) {
      dispatch(setColleagueProfessorErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetColleagueProfessor());
      }, 50);
    }
  };
};
