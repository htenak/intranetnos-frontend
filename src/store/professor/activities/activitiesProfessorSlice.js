import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activityTypes: null,
  activityType: null,
  statusDataActivityType: null, // 'CREATED' , 'UPDATED', 'DELETED'
  activityTypeErrorMessage: undefined,
  activityTypeSuccessMessage: undefined,

  activities: null,
  activity: null,
  statusDataActivity: null, // 'CREATED' , 'UPDATED', 'DELETED'
  activityErrorMessage: undefined,
  activitySuccessMessage: undefined,
};

export const activitiesProfessorSlice = createSlice({
  name: "activitiesProfessor",
  initialState,
  reducers: {
    // activityTypes:
    setActivityTypes: (state, { payload }) => {
      state.activityTypes = payload;
    },
    onActivityTypeCrud: (state, { payload }) => {
      state.statusDataActivityType = payload.crud;
      state.activityType = payload.activityType;
      state.activityTypeSuccessMessage = payload.message;

      if (payload.crud === "CREATED") {
        state.activityTypes.push(payload.activityType);
      }
      if (payload.crud === "UPDATED") {
        state.activityTypes = state.activityTypes.map((element) => {
          if (parseInt(element.id) === parseInt(payload.activityType.id)) {
            return payload.activityType;
          }
          return element;
        });
      }
      if (payload.crud === "DELETED") {
        state.activityTypes = state.activityTypes.filter(
          (data) => parseInt(data.id) !== parseInt(payload.activityType.id)
        );
      }
    },
    resetActivityTypeCrud: (state) => {
      state.activityType = null;
      state.statusDataActivityType = null;
      state.activityTypeErrorMessage = undefined;
      state.activityTypeSuccessMessage = undefined;
    },
    setActivityTypeErrorMessage: (state, { payload }) => {
      state.activityTypeErrorMessage = payload;
    },

    // activities:
    setActivities: (state, { payload }) => {
      state.activities = payload;
    },
    onActivityCrud: (state, { payload }) => {
      state.statusDataActivity = payload.crud;
      state.activity = payload.activity;
      state.activitySuccessMessage = payload.message;

      if (payload.crud === "CREATED") {
        state.activities.push(payload.activity);
      }
      if (payload.crud === "UPDATED") {
        state.activities = state.activities.map((element) => {
          if (parseInt(element.id) === parseInt(payload.activity.id)) {
            return payload.activity;
          }
          return element;
        });
      }
      if (payload.crud === "DELETED") {
        state.activities = state.activities.filter(
          (data) => parseInt(data.id) !== parseInt(payload.activity.id)
        );
      }
    },
    resetActivityCrud: (state) => {
      state.activity = null;
      state.statusDataActivity = null;
      state.activityErrorMessage = undefined;
      state.activitySuccessMessage = undefined;
    },
    setActivityErrorMessage: (state, { payload }) => {
      state.activityErrorMessage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActivityTypes,
  onActivityTypeCrud,
  resetActivityTypeCrud,
  setActivityTypeErrorMessage,

  setActivities,
  onActivityCrud,
  resetActivityCrud,
  setActivityErrorMessage,
} = activitiesProfessorSlice.actions;
