
import axios from 'axios';

export default async (req, res) => {
    try {
        const key = '946bb6a61a0f0a0a7fa49de41142dc83';
        const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
            headers: {
                'xi-api-key': key, // replace <xi-api-key> with your actual API key
                'accept': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end('API fetch failed');
    }
};


// https://api.elevenlabs.io/v1/history
// https://api.elevenlabs.io/v1/voices/