import { intranetApi } from "src/api";

import {
  resetPupilProfessor,
  setLoadingPupilsProfessor,
  setPupilProfessorErrorMessage,
  setPupilsProfessor,
} from "./pupilsProfessorSlice";

export const getAllPupilsProfessor = (parameters = [0, 0]) => {
  return async (dispatch) => {
    dispatch(setLoadingPupilsProfessor(true));
    try {
      const { data } = await intranetApi.get(`/professor/pupils/${parameters}`);
      dispatch(setPupilsProfessor(data.data));
      setTimeout(() => {
        dispatch(setLoadingPupilsProfessor(false));
      }, 500);
    } catch (error) {
      dispatch(setPupilProfessorErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetPupilProfessor());
      }, 50);
    }
  };
};
