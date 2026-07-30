import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../Services/apiGeocoding";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAdress = createAsyncThunk(
  "user/fetchAdress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

const initialState = {
  userName: "",
  status: "idel",
  error: "",
  adress: "",
  postion: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
    updateAdress(state, action) {
      state.adress = action.payload;
      state.postion = {};
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAdress.pending, (state, action) => {
        state.status = "loading";
        console.log("loading...");
      })
      .addCase(fetchAdress.fulfilled, (state, action) => {
        state.adress = action.payload.address;
        state.postion = action.payload.position;
        state.status = "idel";
      })
      .addCase(fetchAdress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});
export const { updateName, updateAdress } = userSlice.actions;
export default userSlice.reducer;
