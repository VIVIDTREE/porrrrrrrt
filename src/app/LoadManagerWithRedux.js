"use client";
import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // 수정된 부분
import { composeWithDevTools } from "@redux-devtools/extension";
import LoadManager from "./LoadManager";

// Redux Reducer와 Action 정의
const SET_LOADING = "SET_LOADING";
const SET_LOADED = "SET_LOADED";
const DATA_LOADED = "DATA_LOADED"; // 데이터 로드 완료 상태를 위한 새 액션 타입

// 액션 생성자 정의
export const setLoadingAction = () => ({ type: SET_LOADING });
export const setLoadedAction = () => ({ type: SET_LOADED });
export const dataLoadedAction = (category = null) => ({
  type: DATA_LOADED,
  payload: category,
});

// 초기 상태 수정
const initialState = {
  isLoading: false,
  loadingCount: 0,
  isDataLoaded: true,
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
      // 카테고리 정보가 있으면 해당 카테고리만 로드 완료로 처리
      // 없으면 전역 데이터 로드 완료 처리
      if (action.payload) {
        return {
          ...state,
          loadedCategories: {
            ...state.loadedCategories,
            [action.payload]: true,
          },
        };
      } else {
        return {
          ...state,
          isDataLoaded: true,
        };
      }
    default:
      return state;
  }
}

// 스토어 생성 코드 수정
const store = createStore(
  loadingReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// 로딩 상태를 업데이트하는 훅에 변화 없음
export const useLoading = () => {
  const dispatch = useDispatch();
  const isDataLoaded = useSelector((state) => state.isDataLoaded); // 데이터 로드 완료 상태를 선택

  const setLoading = () => {
    if (!isDataLoaded) {
      // 데이터가 아직 로드되지 않았을 경우에만 로딩 상태로 설정
      dispatch(setLoadingAction());
    }
  };

  const setLoaded = () => {
    dispatch(setLoadedAction());
    dispatch(dataLoadedAction()); // 로딩 완료 시 데이터 로드 완료 액션도 디스패치
  };

  return { setLoading, setLoaded };
};

// 애플리케이션에 Provider를 포함시키는 컴포넌트는 이전과 동일
export const LoadManagerWithRedux = ({ children }) => {
  return (
    <Provider store={store}>
      <LoadManager>{children}</LoadManager>
    </Provider>
  );
};
