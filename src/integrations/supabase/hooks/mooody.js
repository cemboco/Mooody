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

Note: 
- 'id' is a Primary Key.
- 'created_at' has a default value of now().

No foreign key relationships are defined for this table.
*/

export const useMooody = () => useQuery({
    queryKey: ['mooody'],
    queryFn: () => fromSupabase(supabase.from('mooody').select('*')),
});

export const useAddMooody = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMooody) => fromSupabase(supabase.from('mooody').insert([newMooody])),
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