import { v4 as uuidv4 } from 'uuid'; // For generating unique image names
import { supabase } from './supabase';
import mime from 'mime'
import * as FileSystem from 'expo-file-system';



export const uploadImageAsync = async (uri: string): Promise<string | null> => {
    try {

        const localUri = uri; // Use the local URI directly from ImagePicker

        const formData = new FormData();
        formData.append('file', {
            uri: localUri,
            name: localUri.split('/').pop() || `photo-${uuidv4()}.jpg`, // Fallback name if 'pop' returns null
            type: 'image/jpeg', // Adjust MIME type according to your requirements
        } as any); // Use 'as any' to resolve TypeScript error

        const { data, error } = await supabase.storage
            .from('files')
            .upload(uuidv4() + '.jpg', formData, {
                contentType: 'image/jpeg',
            });

        if (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }

        const { publicUrl } = supabase
            .storage
            .from('files')
            .getPublicUrl(data.path)
            .data;

        return publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};
