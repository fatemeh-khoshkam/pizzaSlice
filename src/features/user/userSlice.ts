import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  //will automatically create three action types based on this:
  // 'user/fetchAddress/pending'
  // 'user/fetchAddress/fulfilled'
  // 'user/fetchAddress/rejected'
  'user/fetchAddress',
  //This function will be called when the thunk is dispatched.
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

type payloadActionFulfilled = {
  position: { latitude?: number; longitude?: number };
  address: string;
};

type initialState = {
  userName: string;
  status: 'idle' | 'loading' | 'error';
  position: { latitude?: number; longitude?: number };
  address: string;
  error: string;
};

const initialState: initialState = {
  userName: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state: initialState, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state: initialState) => {
        state.status = 'loading';
      })
      .addCase(
        fetchAddress.fulfilled,
        (
          state: initialState,
          action: PayloadAction<payloadActionFulfilled>
        ) => {
          state.position = action.payload.position;
          state.address = action.payload.address;
          state.status = 'idle';
        }
      )
      .addCase(fetchAddress.rejected, (state: initialState) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
