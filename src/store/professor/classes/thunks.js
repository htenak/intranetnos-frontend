import { intranetApi } from "src/api";
import {
  resetClassProfessor,
  setClassProfessorErrorMessage,
  setClassesProfessor,
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
