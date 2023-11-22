import { intranetApi } from "src/api";
import {
  resetClassProfessor,
  setClassProfessorErrorMessage,
  setClassesProfessor,
  setLoadingOtherClassesP,
  setOtherClassesProfessors,
  setSchedulesByClass,
} from "../classes";

export const getAllClassesProfessor = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/professor/classes`);
      dispatch(setClassesProfessor(data.data));
    } catch (error) {
      dispatch(setClassProfessorErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassProfessor());
      }, 50);
    }
  };
};

export const getAllOtherClassesProfessor = (parameters = [0, 0, 0]) => {
  return async (dispatch) => {
    dispatch(setLoadingOtherClassesP(true));
    try {
      const { data } = await intranetApi.get(
        `/professor/other-classes/${parameters}`
      );
      dispatch(setOtherClassesProfessors(data.data));
      setTimeout(() => {
        dispatch(setLoadingOtherClassesP(false));
      }, 500);
    } catch (error) {
      dispatch(setClassProfessorErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassProfessor());
      }, 50);
    }
  };
};

export const getSchedulesByClass = (classId) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(
        `/professor/schedules-by-class/${classId}`
      );
      dispatch(setSchedulesByClass(data.data));
    } catch (error) {
      dispatch(setClassProfessorErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassProfessor());
      }, 50);
    }
  };
};
