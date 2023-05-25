const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://usheffdpfoeoabrvelzo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaGVmZmRwZm9lb2FicnZlbHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NzU5NTYsImV4cCI6MjAwMDQ1MTk1Nn0.9QBDBCtlYT-hH-Zjp94pO3brSvNvtrIoajUQJaN5bGU"
const supabase = createClient(supabaseUrl, supabaseKey)


module.exports = supabase;