import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, RecentMessage, CallLog, getUsers, getRecentMessages, getCallLogs } from '@/services/api';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            queryFn: async () => {
                try {
                    const data = await getUsers();
                    return { data };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: 'Failed to fetch users' } };
                }
            },
        }),
        getRecentActivity: builder.query<{ messages: RecentMessage[]; calls: CallLog[] }, void>({
            queryFn: async () => {
                try {
                    const [messages, calls] = await Promise.all([
                        getRecentMessages(),
                        getCallLogs()
                    ]);
                    return { data: { messages, calls } };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: 'Failed to fetch activity' } };
                }
            },
        }),
    }),
});

export const { useGetUsersQuery, useGetRecentActivityQuery } = dashboardApi;
