import { intranetApi } from "src/api";
import {
  setActivityTypes,
  onActivityTypeCrud,
  resetActivityTypeCrud,
  setActivityTypeErrorMessage,
  setActivities,
  onActivityCrud,
  resetActivityCrud,
  setActivityErrorMessage,
} from "../activities";

// activityTypes:

export const getAllActivityTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(
        `/activity/professor/activities-type`
      );
      dispatch(setActivityTypes(data.data));
    } catch (error) {
      dispatch(setActivityTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetActivityTypeCrud());
      }, 50);
    }
  };
};

export const saveActivityType = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(
        `/activity/professor/activities-type`,
        form
      );
      dispatch(
        onActivityTypeCrud({
          crud: "CREATED",
          activityType: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetActivityTypeCrud());
      }, 50);
    } catch (error) {
      dispatch(setActivityTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetActivityTypeCrud());
      }, 50);
    }
  };
};

export const updateActivityType = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/activity/professor/activities-type/${form.id}`,
        form
      );
      dispatch(
        onActivityTypeCrud({
          crud: "UPDATED",
          activityType: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetActivityTypeCrud());
      }, 50);
    } catch (error) {
      dispatch(setActivityTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetActivityTypeCrud());
      }, 50);
    }
  };
};

export const deleteActivityType = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(
        `/activity/professor/activities-type/${form.id}`
      );
      dispatch(
        onActivityTypeCrud({
          crud: "DELETED",
          activityType: form,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetActivityTypeCrud());
      }, 50);
    } catch (error) {
      dispatch(setActivityTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetActivityTypeCrud());
      }, 50);
    }
  };
};
