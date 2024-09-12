// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useMooody, useAddMooody, useUpdateMooody, useDeleteMooody, useGetMooodyById } from './hooks/mooody.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useMooody,
  useAddMooody,
  useUpdateMooody,
  useDeleteMooody,
  useGetMooodyById,
};