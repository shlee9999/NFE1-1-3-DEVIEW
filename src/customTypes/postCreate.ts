// 버전 데이터 인터페이스
export interface VersionData {
  id: string;
  lan: string;
  version: string;
}

// 폼 상태 인터페이스
export interface PostFormState {
  title: string;
  content: string;
  code: string; // 코드 에디터 내용
  versions: VersionData[];
}

// 각 액션별 페이로드 타입 정의
export interface SetTitleAction {
  type: "SET_TITLE";
  payload: string;
}

export interface SetContentAction {
  type: "SET_CONTENT";
  payload: string;
}

export interface SetCodeAction {
  type: "SET_CODE";
  payload: string;
}

export interface AddVersionAction {
  type: "ADD_VERSION";
}

export interface RemoveVersionAction {
  type: "REMOVE_VERSION";
  payload: string; // version id
}

export interface UpdateVersionAction {
  type: "UPDATE_VERSION";
  payload: {
    id: string;
    field: "lan" | "version";
    value: string;
  };
}

export type ResetFormAction = {
  type: "RESET_FORM";
}

// 모든 가능한 액션 타입 통합
export type PostFormAction =
  | SetTitleAction
  | SetContentAction
  | SetCodeAction
  | AddVersionAction
  | RemoveVersionAction
  | UpdateVersionAction
  | ResetFormAction;

// 초기 상태
export const initialState: PostFormState = {
  title: "",
  content: "",
  code: "",
  versions: [{ id: "1", lan: "", version: "" }]
};

// 타입 가드 함수들
export const isVersionUpdateAction = (action: PostFormAction): action is UpdateVersionAction => {
  return action.type === "UPDATE_VERSION";
};

export const isVersionRemoveAction = (action: PostFormAction): action is RemoveVersionAction => {
  return action.type === "REMOVE_VERSION";
};