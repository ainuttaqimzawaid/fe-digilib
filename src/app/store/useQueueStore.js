import { create } from "zustand";
import { queueService } from "../api/services/queue";

const useQueueStore = create((set, get) => ({
    myQueue: [],
    loading: false,
    error: null,

    fetchMyQueue: async () => {
        set((state) => ({ loading: true, error: null }));
        try {
            const data = await queueService.getMine();
            set({ myQueue: Array.isArray(data) ? data : [data] });
            set((state) => ({ loading: false }));
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    addQueue: async (payload) => {
        set((state) => ({
            loading: true,
            error: null,
        }));

        try {
            const response = await queueService.add(payload);

            set((state) => ({
                myQueue: [...state.myQueue, response.queue],
                loading: false,
            }));
        } catch (err) {
            set((state) => ({
                error: err.response?.data?.message || err.message,
                loading: false,
            }));
        }
    },

    cancelQueue: async (id) => {
        set((state) => ({
            loading: true,
            error: null,
        }));

        try {
            const response = await queueService.cancel(id);

            set((state) => ({
                myQueue: state.myQueue.filter((q) => q.id !== id),
                loading: false,
            }));
        } catch (err) {
            set((state) => ({
                error: err.response?.data?.message || err.message,
                loading: false,
            }));
        }
    },
}));

export default useQueueStore;