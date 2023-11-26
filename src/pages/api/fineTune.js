
import axios from 'axios';

export default async (req, res) => {
    try {
        const data = {
            text: "Hello, this is a sample text for fine-tuning."
          }
        const response = await axios.get('https://api.elevenlabs.io/v1/history', {
        
            headers: {
                'xi-api-key': process.env.PAID_ELEVEN_API_KEY, // replace <xi-api-key> with your actual API key
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
// https://api.elevenlabs.io/v1/voices/1gKVxa60t3xPmQ8CMzay/fine-tune