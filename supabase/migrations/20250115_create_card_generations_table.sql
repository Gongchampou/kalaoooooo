/*
# Create Card Generations Table
This migration creates a table to store all card generation data including inputs and outputs.

## Query Description: 
Creates a new table for storing card generation sessions. This is a safe operation that adds new functionality without affecting existing data.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: card_generations
- Columns: id, video_type, video_links, image_links, titles, descriptions, generated_html, created_at

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes (public read/write for demo purposes)
- Auth Requirements: None (public access)

## Performance Impact:
- Indexes: Primary key index on id, index on created_at
- Triggers: None
- Estimated Impact: Minimal performance impact
*/

-- Create the card_generations table
CREATE TABLE public.card_generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_type VARCHAR(20) NOT NULL CHECK (video_type IN ('googledrive', 'youtube')),
    video_links TEXT[] NOT NULL,
    image_links TEXT[] NOT NULL,
    titles TEXT[] NOT NULL,
    descriptions TEXT[] NOT NULL,
    generated_html TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for better query performance
CREATE INDEX idx_card_generations_created_at ON public.card_generations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.card_generations ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (since no authentication)
CREATE POLICY "Allow public read access" ON public.card_generations
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.card_generations
    FOR INSERT WITH CHECK (true);

-- Add comments for documentation
COMMENT ON TABLE public.card_generations IS 'Stores card generation sessions with input data and generated HTML output';
COMMENT ON COLUMN public.card_generations.video_type IS 'Type of video service: googledrive or youtube';
COMMENT ON COLUMN public.card_generations.video_links IS 'Array of input video links';
COMMENT ON COLUMN public.card_generations.image_links IS 'Array of input image links';
COMMENT ON COLUMN public.card_generations.titles IS 'Array of card titles';
COMMENT ON COLUMN public.card_generations.descriptions IS 'Array of card descriptions';
COMMENT ON COLUMN public.card_generations.generated_html IS 'Final generated HTML output';
