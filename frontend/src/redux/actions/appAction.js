import appSlice from "../slices/appSlice";

const { clearError,clearLoader } = appSlice.actions;

export const clearErrorAction = () => (dispatch) => {
    dispatch(clearError());
}
