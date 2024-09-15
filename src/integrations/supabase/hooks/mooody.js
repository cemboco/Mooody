import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### mooody

| name       | type                     | format    | required |
|------------|--------------------------|-----------|----------|
| id         | integer                  | bigint    | true     |
| created_at | string                   | timestamp | true     |
| user_id    | string                   | uuid      | true     |
| mood       | integer                  |           | true     |
| notes      | string                   | text      | false    |

Note: 
- 'id' is a Primary Key.
- 'created_at' has a default value of now().
- 'user_id' is added to comply with Row Level Security policies.

Row Level Security is enabled on this table with the following policies:
- Users can only select, insert, update, and delete their own entries.

SQL to alter the table and enable RLS:

ALTER TABLE public.mooody
ADD COLUMN user_id UUID NOT NULL,
ADD COLUMN mood INTEGER NOT NULL,
ADD COLUMN notes TEXT;

ALTER TABLE public.mooody ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own entries" ON public.mooody
FOR ALL USING (auth.uid() = user_id);
*/

export const useMooody = () => useQuery({
    queryKey: ['mooody'],
    queryFn: () => fromSupabase(supabase.from('mooody').select('*')),
});

export const useAddMooody = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newMooody) => {
            const { data: { user } } = await supabase.auth.getUser();
            return fromSupabase(supabase.from('mooody').insert([{
                ...newMooody,
                user_id: user.id
            }]));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('mooody');
        },
    });
};

export const useUpdateMooody = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('mooody').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('mooody');
        },
    });
};

export const useDeleteMooody = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('mooody').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('mooody');
        },
    });
};

export const useGetMooodyById = (id) => useQuery({
    queryKey: ['mooody', id],
    queryFn: () => fromSupabase(supabase.from('mooody').select('*').eq('id', id).single()),
    enabled: !!id,
});

// Function to get the current user's ID
const getCurrentUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id;
};

// Updated function to get mooody entries for the current user
export const useCurrentUserMooody = () => {
    return useQuery({
        queryKey: ['currentUserMooody'],
        queryFn: async () => {
            const userId = await getCurrentUserId();
            if (!userId) throw new Error('User not authenticated');
            return fromSupabase(supabase.from('mooody').select('*').eq('user_id', userId));
        },
    });
};
