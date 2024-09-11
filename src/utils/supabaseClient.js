import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mypxifpqgzyhhecibskk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15cHhpZnBxZ3p5aGhlY2lic2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MTM4ODYsImV4cCI6MjA0MTM4OTg4Nn0.6h8ABP7_V4FAap0RJOC9-QxyqDtRgwDYblmkDtLef4c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);