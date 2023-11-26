//@ts-nocheck
import {create} from 'zustand'
import axios from 'axios'
export const useStore = create(() => ({
    chats: [],
  
    loadChats: async (userId:any, characterId:any) => {
    //   const res = await fetch('/api/fetchCharacter');
      const res = await fetch(`/api/fetchHistory?userId=${userId}&characterId=${characterId}`)
      const data = await res.json()
      // Map the chat history to include a voiceMessage field
      const chats = data.map(chat => ({
        ...chat,
        voiceMessage: chat.answeraudio
      }));
      useStore.setState({
        chats: data  
      })
      return data
    },

    saveChat: async (chat:any) => {
      console.log(chat)
      if (chat.answeraudio && chat.answeraudio.startsWith('data:audio')) {
        // Convert base64 audio data to Blob
        const audioData = chat.answeraudio.split(",")[1];
        const byteCharacters = atob(audioData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "audio/mpeg" });
    
        // Create FormData object and append Blob
        const formData = new FormData();
        formData.append("file", blob);
    
        // Send POST request to /api/uploadAudio with FormData
        const response = await fetch("/api/uploadAudio", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
    
        // Use returned URL when creating characterChat
        chat.answeraudio = data.audio;
      }
    
      const res = await fetch('/api/addhistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(chat)
      })
      const data = await res.json()
      useStore.setState({
        chats: data  
      })
      return data
    }
    
  }))