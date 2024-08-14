import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';



export const uploadImageAsync = async (uri: string): Promise<string | null> => {
    try {

        const localUri = uri;

        const formData = new FormData();
        formData.append('file', {
            uri: localUri,
            name: localUri.split('/').pop() || `photo-${uuidv4()}.jpg`,
            type: 'image/jpeg',
        } as any);

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
