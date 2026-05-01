import { createClient } from '@supabase/supabase-js';

const supabaseUrl = undefined                            ;
const supabaseKey = undefined                            ;
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase as s };
