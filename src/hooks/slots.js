import { useQuery, useMutation, useQueryClient } from "react-query";
import { Api } from '../utility/api';

export const useListSlots = () => {
    return useQuery(['slots'], async () => {
        return Api.get(`slots`);
    });
}

export const useListAvailableSlots = (params) => {
    return useQuery(['available_alots', params], async () => {
        return Api.get(`slots/available`, params);
    });
}

export const useCreateSlot = () => {
    const queryClient = useQueryClient();

    return useMutation(async (slot) => {
        return Api.post(`slots`, slot);
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(['slots']);
        }
    }
    );
}