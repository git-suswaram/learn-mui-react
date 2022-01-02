Maria DB
https://www.youtube.com/watch?v=O9gAubh_YDY

json_type(json_query(`profile_attributes`,'$')) = 'OBJECT' and json_type(json_query(`profile_attributes`,'$.renew_instructions')) = 'OBJECT' and json_type(json_value(`profile_attributes`,'$.term_start_date')) = 'DATETIME' and json_type(json_value(`profile_attributes`,'$.term_end_date')) = 'DATETIME' and json_type(json_value(`profile_attributes`,'$.term_opening_value')) = 'DECIMAL' and json_type(json_value(`profile_attributes`,'$.term_ending_value')) = 'DECIMAL' and json_type(json_value(`profile_attributes`,'$.deposit_amount')) = 'DECIMAL' and json_type(json_value(`profile_attributes`,'$.interest_rate')) = 'DECIMAL'


