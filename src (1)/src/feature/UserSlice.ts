import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: any = {
  users: [],
  isLoading: true,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    apiData(state, action) {
      state.users = action.payload;
      state.isLoading = false;
    },
    addUser: (state, action: any) => {
      const newUser = action.payload;
      const existingUser = state.users.find((user:any)=> user.phone ===newUser.phone);
      state.isLoading = false;
      if(!existingUser){
          state.users.push(newUser);
      }
    },
    removeUser: (state, action: any) => {
      state.users = state.users.filter(
        (user: any) => user.id !== action.payload
      );
      state.isLoading = false;
    },
    updateUser: (state, action: any) => {
      state.isLoading = false;
      state.users.map((user: any) => {
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
          user.username = action.payload.username;
          user.email = action.payload.email;
          user.phone = action.payload.phone;
          user.website = action.payload.website;
        }
      });
    },
  },
});

export const usersAction = UserSlice.actions;
export default UserSlice;
