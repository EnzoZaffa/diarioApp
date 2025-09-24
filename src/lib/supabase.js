import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://anwqnkwmsvimrlxyqziv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFud3Fua3dtc3ZpbXJseHlxeml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzMyNTUsImV4cCI6MjA3NDMwOTI1NX0.r_1CfotRlyAkCPZtMnLE5BgsMo36-al28ekRma7aSS8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
