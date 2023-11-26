import axios from 'axios';

export default async function cloneVoice(req, res) {
  const cloneVoiceUrl = "https://api.elevenlabs.io/v1/voices/add";
  //const settingsUrl = `https://api.elevenlabs.io/v1/voices/${process.env.ELEVEN_VOICE_ID}/settings/edit`;

  const cloneVoiceHeaders = {
    "xi-api-key": process.env.PAID_ELEVEN_API_KEY,
    "Content-Type": "multipart/form-data"
  };
  
  const settingsHeaders = {
    "xi-api-key": process.env.PAID_ELEVEN_API_KEY,
    "Content-Type": "application/json"
  };

  const cloneVoiceData = {
    "name": "ni",
    "files": ["../posy.mp3"],
    "Content-Type": "multipart/form-data"
  };
  
  const settingsData = {
    "stability": 0.5,
    "similarity_boost":0.5
  };

//   let formData = new FormData();
//   let file2 = {size: 12120, type: 'application/pdf'}
//  let file4 = {
//     name: 's.mp3', 
//     lastModified: 1691724696750, 
//     lastModifiedDate: 'Fri Aug 11 2023 06:31:36 GMT+0300 (East Africa Time)', 
//     webkitRelativePath: '', 
//     size: 12120,
//     type: "audio/mpeg", 
//   }

//   let file1 = {size: 1437944, type: 'application/pdf'}
//   let file3 =  {
//       name: 'posy.mp3', 
//       lastModified: 1691751251265, 
//       lastModifiedDate: 'Fri Aug 11 2023 13:54:11 GMT+0300 (East Africa Time)', 
//       webkitRelativePath: '', 
//       size: 1437944,
//       type: "audio/mpeg",
//     }
//   formData.append('name', 'Voice Name');
//   formData.append('labels', '{"accent": "American", "gender": "Female"}');
//   formData.append('description', 'Voice Description');
//   formData.append('files', file3, file1); // file1 is your File object for sample 1
//   formData.append('files', file4, file2); // file2 is your File object for sample 2
  
//   let headers = {
//     "Accept": "application/json",
//     "xi-api-key":  process.env.PAID_ELEVEN_API_KEY
//   };
  
//   fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: formData
//   })
//   .then(response => response.json())
//   .then(response => {
//     console.log('Voice Id: ' + response.voice_id)
//     res.status(200).json({ message: "Voice cloned successfully"});
//   })
//   .catch(error => console.error('Error:', error));
  
  // try {
  //   const resp = await axios.post(cloneVoiceUrl, cloneVoiceData, { headers: cloneVoiceHeaders } );
  //    await axios.post(settingsUrl, settingsData, { headers: settingsHeaders } );
  //   console.log("roof", resp);
  //   res.status(200).json({ message: "Voice cloned successfully"});
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "An error occurred while cloning the voice" });
  // }

  try {
   const response = await axios.post(cloneVoiceUrl, cloneVoiceData, { headers: cloneVoiceHeaders } );
    //const response = await axios.post(add_voice_url, headers=headers, data=data, files=files)
    const voiceId = response.data.voice_id;
    console.log("eyes", response);
    res.status(200).json({ message: "Voice cloned successfully", voice_id: voiceId});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while cloning the voice" });
  }
}