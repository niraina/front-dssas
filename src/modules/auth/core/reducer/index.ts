/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit";
import { initState, setCurrentUser, setProfileData, setValidToken, toggleTokenRefreshed } from "../actions";

const initialState = {
  currentUser: null,
  tokenStatus: false,
  profileData: null,
  accessTokenState: {
    refreshed: false,
    valid: false,
  },
};

export const userReducer = createReducer(
  initialState.currentUser,
  (builder) => {
    return builder
      .addCase(setCurrentUser, (_state, action) => {
        return action.payload;
      })
      .addCase(initState, () => {
        return null;
      });
  }
);

export const profileReducer = createReducer(
  initialState.profileData,
  (builder) => {
    return builder
      .addCase(setProfileData, (_state, action) => {
        return action.payload;
      })
  }
);

export const accessTokenReducer = createReducer(
  initialState.accessTokenState,
  (builder) => {
    return builder
      .addCase(toggleTokenRefreshed, (draft: any) => {
        draft.refreshed = !draft.refreshed;
        return;
      })
      .addCase(setValidToken, (draft: any, action) => {
        draft.valid = action.payload;
        return;
      })
      .addCase(initState, (draft: any) => {
        draft.valid = false;
        return;
      });
  }
);
