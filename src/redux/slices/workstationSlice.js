import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchWorkstation = createAsyncThunk(
  "workstations/fetchWorkstation",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/workstations/${fetchPayload?.id}`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const fetchGeneralStats = createAsyncThunk(
  "workstations/fetchGeneralStats",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/stat/general`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const fetchWorkstationMembers = createAsyncThunk(
  "workstations/fetchWorkstationMembers",
  async (fetchPayload, thunkAPI) => {
    try {
      const { data } = await Axios.get(
        `${BASE_API_URL}/workstations/members/`,
        {
          params: fetchPayload,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const createWorkstation = createAsyncThunk(
  "workstations/createWorkstation",
  async (createPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.post(`${BASE_API_URL}/workstations`, createPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const addMemberToWorkstation = createAsyncThunk(
  "workstations/addMemberToWorkstation",
  async (addPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/workstations/members/`,
        addPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const editWorkstation = createAsyncThunk(
  "workstations/editWorkstation",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.patch(
        `${BASE_API_URL}/workstations/${editPayload.id}/`,
        editPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const uploadWorkstationLogo = createAsyncThunk(
  "workstations/uploadWorkstationLogo",
  async (formData, thunkAPI) => {
    try {
      const { data } = await Axios.post(`${BASE_API_URL}/files`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const uploadWorkstationImage = createAsyncThunk(
  "workstations/uploadWorkstationImage",
  async (formData, thunkAPI) => {
    try {
      const { data } = await Axios.post(`${BASE_API_URL}/files`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const deleteWorkstation = createAsyncThunk(
  "workstations/deleteWorkstation",
  async (workstationId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(
        `${BASE_API_URL}/church/workstations/${workstationId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return workstationId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const deleteWorkstationMember = createAsyncThunk(
  "workstations/deleteWorkstationMember",
  async (deletePayload, thunkAPI) => {
    try {
      const { data } = await Axios.delete(
        `${BASE_API_URL}/workstations/members/`,
        {
          params: deletePayload,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return deletePayload.user_id;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

const workstationSlice = createSlice({
  name: "workstations",
  initialState: {
    workstation: null,
    generalStats: null,
    workstationMembers: { data: [], unregistered_members: [] },
    loading: "FETCH_WORKSTATION",
    error: "",
    success: "",
  },
  reducers: {
    clearStates: (state, { payload }) => {
      delete state.loading;
      delete state.error;
      delete state.success;
    },
  },
  extraReducers: {
    [fetchWorkstation.pending]: (state) => {
      state.workstation = null;
      delete state.error;
      delete state.success;
      state.loading = "FETCH_WORKSTATION";
    },
    [fetchWorkstation.fulfilled]: (state, action) => {
      state.success = "FETCH_WORKSTATION";
      state.workstation = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchWorkstation.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_WORKSTATION",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [fetchGeneralStats.pending]: (state) => {
      state.generalStats = null;
      delete state.error;
      delete state.success;
      state.loading = "FETCH_GENERAL_STATS";
    },
    [fetchGeneralStats.fulfilled]: (state, action) => {
      state.success = "FETCH_GENERAL_STATS";
      state.generalStats = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchGeneralStats.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_GENERAL_STATS",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [fetchWorkstationMembers.pending]: (state) => {
      state.workstationMembers = { data: [] };
      delete state.error;
      delete state.success;
      state.loading = "FETCH_WORKSTATION_MEMBERS";
    },
    [fetchWorkstationMembers.fulfilled]: (state, action) => {
      state.success = "FETCH_WORKSTATION_MEMBERS";
      state.workstationMembers = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchWorkstationMembers.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_WORKSTATION_MEMBERS",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [createWorkstation.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_WORKSTATION";
    },
    [createWorkstation.fulfilled]: (state, action) => {
      state.success = "CREATE_WORKSTATION";
      state.workstation = action.payload;
      delete state.loading;
      delete state.error;
    },
    [createWorkstation.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_WORKSTATION",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [addMemberToWorkstation.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "ADD_WORKSTATION_MEMBER";
    },
    [addMemberToWorkstation.fulfilled]: (state, action) => {
      state.success = "ADD_WORKSTATION_MEMBER";
      state.workstationMembers = action.payload;
      delete state.loading;
      delete state.error;
    },
    [addMemberToWorkstation.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "ADD_WORKSTATION_MEMBER",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [editWorkstation.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_WORKSTATION";
    },
    [editWorkstation.fulfilled]: (state, action) => {
      state.success = "EDIT_WORKSTATION";
      state.workstation = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editWorkstation.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_WORKSTATION",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [uploadWorkstationLogo.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "UPLOAD_WORKSTATION_LOGO";
    },
    [uploadWorkstationLogo.fulfilled]: (state, action) => {
      state.success = "UPLOAD_WORKSTATION_LOGO";
      state.workstation.logo = action.payload;
      delete state.loading;
      delete state.error;
    },
    [uploadWorkstationLogo.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "UPLOAD_WORKSTATION_LOGO",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [uploadWorkstationImage.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "UPLOAD_WORKSTATION_IMAGE";
    },
    [uploadWorkstationImage.fulfilled]: (state, action) => {
      state.success = "UPLOAD_WORKSTATION_IMAGE";
      state.workstation.images.push(action.payload);
      delete state.loading;
      delete state.error;
    },
    [uploadWorkstationImage.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "UPLOAD_WORKSTATION_IMAGE",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [deleteWorkstation.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_WORKSTATION";
      const position = state.workstations.findIndex(
        (workstation) => workstation.id === action.meta.arg
      );
      state.backupWorkstation = Object.assign({}, state.workstations[position]);
      state.backupPosition = position;
    },
    [deleteWorkstation.fulfilled]: (state) => {
      state.success = "DELETE_WORKSTATION";
      state.workstations.splice(state.backupPosition, 1);
      delete state.backupWorkstation;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteWorkstation.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_WORKSTATION",
        errorMessage: payload?.error,
      };
      delete state.backupPosition;
      delete state.backupWorkstation;
      delete state.loading;
    },

    [deleteWorkstationMember.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_WORKSTATION_MEMBER";
      // const position = state.workstationMembers.data.findIndex(
      //   (workstation) => workstation.id === action.meta.arg
      // );
      // state.backupWorkstation = Object.assign({}, state.workstationMembers.data[position]);
      // state.backupPosition = position;
    },
    [deleteWorkstationMember.fulfilled]: (state) => {
      state.success = "DELETE_WORKSTATION_MEMBER";
      // state.workstationMembers.data.splice(state.backupPosition, 1);
      // delete state.backupWorkstation;
      // delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteWorkstationMember.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_WORKSTATION_MEMBER",
        errorMessage: payload?.error,
      };
      // delete state.backupPosition;
      // delete state.backupWorkstation;
      delete state.loading;
    },
  },
});
export const { clearStates } = workstationSlice.actions;
export const workstationActions = workstationSlice.actions;
export default workstationSlice.reducer;
