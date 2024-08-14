// 9bmAFD7w23aI7l2q
import 'react-native-get-random-values';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ltqymskhkhjftlzedwyc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0cXltc2toa2hqZnRsemVkd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMTM1NTMsImV4cCI6MjAzNjc4OTU1M30.HqOh3jYmSIyUzqIZtRGSutJjR1REMagvPRbpc0q0bEA'
export const supabase = createClient(supabaseUrl, supabaseKey)