import { intranetApi } from "src/api";
import {
  resetClassProfessor,
  setClassProfessorErrorMessage,
  setClassesProfessor,
  setOtherClassesProfessors,
  setSchedulesByClass,
} from "./classesSliceProfessor";

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

export const getAllOtherClassesProfessor = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/professor/other-classes`);
      dispatch(setOtherClassesProfessors(data.data));
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
