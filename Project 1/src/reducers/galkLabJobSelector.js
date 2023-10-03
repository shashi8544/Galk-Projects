import { ItemStatus } from "../Models/ItemStatus";

export const getJobListLoadingStatus = (state) => {
    if (state.galkLab.isLoading === ItemStatus.Loading) {
        return true;
    }
    return false;
};
