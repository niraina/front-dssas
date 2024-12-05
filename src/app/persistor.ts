import storage from "reduxjs-toolkit-persist/lib/storage";
import {
    persistReducer,
} from "reduxjs-toolkit-persist";
import { rootReducer } from "./rootReducer";

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["currentUser"],
};

export const _persistedReducer = persistReducer(persistConfig, rootReducer);
