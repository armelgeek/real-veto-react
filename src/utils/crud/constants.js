
const CREATE_ERROR = "createError";
const CREATE_START = "createStart";
const CREATE_SUCCESS = "createSuccess";
const DELETE_ERROR = "deleteError";
const DELETE_START = "deleteStart";
const DELETE_SUCCESS = "deleteSuccess";
const FETCH_SUCCESS = "fetchSuccess";
const GET_SUCCESS='getSuccess';
const UPDATE_ERROR = "updateError";
const UPDATE_START = "updateStart";
const UPDATE_SUCCESS = "updateSuccess";

export default {
  DEFAULT_KEY: "id",
  STORE_LIST: "STORE_LIST",
  STORE_MAP: "STORE_MAP",
  REDUCER_NAMES: {
    CREATE_ERROR,
    CREATE_START,
    CREATE_SUCCESS,
    DELETE_ERROR,
    DELETE_START,
    DELETE_SUCCESS,
    FETCH_SUCCESS,
    GET_SUCCESS,
    UPDATE_ERROR,
    UPDATE_START,
    UPDATE_SUCCESS
  },
  SPECIAL_KEYS: {
    BUSY: "busy",
    CLIENT_GENERATED_ID: "_cid",
    DELETED: "deleted",
    PENDING_CREATE: "pendingCreate",
    PENDING_UPDATE: "pendingUpdate"
  }
};
