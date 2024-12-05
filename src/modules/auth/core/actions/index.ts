import { createAction } from "@reduxjs/toolkit";

export const setCurrentUser = createAction("user/setCurrent");
export const setProfileData = createAction("user/profile");
export const initState = createAction("user/initState");
export const toggleTokenRefreshed = createAction("token/toggleRefresh");
export const setValidToken = createAction<boolean>("token/valid");
