// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for debugging
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tewreqqrrbkomgmwybox.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRld3JlcXFycmJrb21nbXd5Ym94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MjEwMjYsImV4cCI6MjA3MjQ5NzAyNn0.TubRiv50J1tqgEqJkAsrPi1lHEHlLbLom7VB_KBOuic';

console.log('🔧 Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? 'Loaded' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database service for card generations
export class CardGenerationService {
    /**
     * Save a card generation session to the database
     */
    static async saveCardGeneration(data) {
        try {
            console.log('💾 Saving card generation to database...');
            
            const { data: savedData, error } = await supabase
                .from('card_generations')
                .insert([{
                    video_type: data.videoType,
                    image_type: data.imageType,
                    video_links: data.videoLinks,
                    image_links: data.imageLinks,
                    titles: data.titles,
                    descriptions: data.descriptions,
                    generated_html: data.generatedHtml
                }])
                .select()
                .single();

            if (error) {
                console.error('❌ Database error:', error);
                throw error;
            }

            console.log('✅ Successfully saved to database:', savedData.id);
            return savedData;
        } catch (error) {
            console.error('Error saving card generation:', error);
            throw new Error(`Failed to save card generation: ${error.message}`);
        }
    }

    /**
     * Get all saved card generations (most recent first)
     */
    static async getCardGenerations(limit = 50) {
        try {
            console.log('📥 Fetching saved generations...');
            
            const { data, error } = await supabase
                .from('card_generations')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('❌ Database error:', error);
                throw error;
            }

            console.log(`✅ Fetched ${data?.length || 0} saved generations`);
            return data || [];
        } catch (error) {
            console.error('Error fetching card generations:', error);
            throw new Error(`Failed to fetch card generations: ${error.message}`);
        }
    }

    /**
     * Get a specific card generation by ID
     */
    static async getCardGenerationById(id) {
        try {
            console.log(`📄 Fetching generation: ${id}`);
            
            const { data, error } = await supabase
                .from('card_generations')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('❌ Database error:', error);
                throw error;
            }

            console.log('✅ Successfully fetched generation');
            return data;
        } catch (error) {
            console.error('Error fetching card generation:', error);
            throw new Error(`Failed to fetch card generation: ${error.message}`);
        }
    }

    /**
     * Delete a card generation by ID
     */
    static async deleteCardGeneration(id) {
        try {
            console.log(`🗑️ Deleting generation: ${id}`);
            
            const { error } = await supabase
                .from('card_generations')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('❌ Database error:', error);
                throw error;
            }

            console.log('✅ Successfully deleted generation');
            return true;
        } catch (error) {
            console.error('Error deleting card generation:', error);
            throw new Error(`Failed to delete card generation: ${error.message}`);
        }
    }

    /**
     * Test database connectivity
     */
    static async testConnection() {
        try {
            console.log('🔍 Testing database connection...');
            
            const { data, error } = await supabase
                .from('card_generations')
                .select('count')
                .limit(1);

            if (error) {
                console.error('❌ Connection test failed:', error);
                return false;
            }

            console.log('✅ Database connection successful');
            return true;
        } catch (error) {
            console.error('Connection test error:', error);
            return false;
        }
    }
}
