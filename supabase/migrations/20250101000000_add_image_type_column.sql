/*
# [Add Image Type Column]
Adds an 'image_type' column to the 'card_generations' table to store the selected image processing option.

## Query Description:
This operation adds a new text column named 'image_type' to the 'card_generations' table. It will have a default value of 'googledrive' for existing rows to maintain compatibility. This change is non-destructive and should not impact existing data.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: card_generations
- Column Added: image_type (TEXT)

## Security Implications:
- RLS Status: Unchanged
- Policy Changes: No
- Auth Requirements: None

## Performance Impact:
- Indexes: None added
- Triggers: None added
- Estimated Impact: Negligible. Adding a column with a default value might take a short time on very large tables.
*/
ALTER TABLE public.card_generations
ADD COLUMN image_type TEXT NOT NULL DEFAULT 'googledrive';
