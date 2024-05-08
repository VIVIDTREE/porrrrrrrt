"use client";
import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // 수정된 부분
import { composeWithDevTools } from "@redux-devtools/extension";
import LoadManager from "./LoadManager";

// Redux Reducer와 Action 정의
const SET_LOADING = "SET_LOADING";
const SET_LOADED = "SET_LOADED";
const DATA_LOADED = "DATA_LOADED";

// 액션 생성자 정의
export const setLoadingAction = () => ({ type: SET_LOADING });
export const setLoadedAction = () => ({ type: SET_LOADED });
export const dataLoadedAction = (category = null) => ({
  type: DATA_LOADED,
  payload: category,
});

// 초기 상태 수정
const initialState = {
  isLoading: false, // 수정된 부분
  loadingCount: 0,
  isDataLoaded: false, // 수정된 부분
  loadedCategories: {},
};

// 리듀서 수정
function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
        loadingCount: state.loadingCount + 1,
      };
    case SET_LOADED:
      const updatedLoadingCount = Math.max(0, state.loadingCount - 1);
      return {
        ...state,
        isLoading: updatedLoadingCount > 0,
        loadingCount: updatedLoadingCount,
      };
    case DATA_LOADED:
      const allDataLoaded = action.payload
        ? { ...state.loadedCategories, [action.payload]: true }
        : { ...state.loadedCategories };
      return {
        ...state,
        isDataLoaded: Object.keys(allDataLoaded).length > 0,
        loadedCategories: allDataLoaded,
      };
    default:
      return state;
  }
}

// 스토어 생성 코드 수정
const store = createStore(
  loadingReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// 로딩 상태를 업데이트하는 훅
export const useLoading = () => {
  const dispatch = useDispatch();
  const isDataLoaded = useSelector((state) => state.isDataLoaded);

  const setLoading = (force = false) => {
    if (force || !isDataLoaded) {
      dispatch(setLoadingAction());
    }
  };

  const setLoaded = () => {
    dispatch(setLoadedAction());
    dispatch(dataLoadedAction());
  };

  return { setLoading, setLoaded, isDataLoaded };
};

// 애플리케이션에 Provider를 포함시키는 컴포넌트
export const LoadManagerWithRedux = ({ children }) => {
  return (
    <Provider store={store}>
      <LoadManager>{children}</LoadManager>
    </Provider>
  );
};
