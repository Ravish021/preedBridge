import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessages: [],
  directMessageContacts:[],
  channelContacts: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChatType: (state, action) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatData: (state, action) => {
      state.selectedChatData = action.payload;
    },
    setSelectedChatMessages: (state, action) => {
      state.selectedChatMessages = action.payload;
    },
    setDirectMessageContacts: (state, action) => {
      state.directMessageContacts = action.payload;
    },
    closeSelectedChat: (state) => {
      state.selectedChatType = null;
      state.selectedChatData = null;
      state.selectedChatMessages = [];
    },
    addMessage: (state, action) => {
      const newMessage = action.payload;
      const selectedChatType = state.selectedChatType;
      // state.selectedChatMessages.push(newMessage);
      state.selectedChatMessages.push({
        ...newMessage,
        receiver:
          selectedChatType === 'channel'
            ? newMessage.receiver
            : newMessage.receiver._id,
        sender:
          selectedChatType === 'channel'
            ? newMessage.sender
            : newMessage.sender._id,
      });
    },
    // This action is used to set the contacts for channels
    setChannelContacts: (state, action) => {
      state.channelContacts = action.payload;
    },
    addChannel: (state, action) => {
      const newChannel = action.payload;
      state.channelContacts = [newChannel, ...(state.channelContacts) || []];
    },
    moveChannelToTop: (state, action) => {
    const message = action.payload; // This is the message that was just sent or received

    const index = state.channelContacts.findIndex(  // Find the channel that matches the message's channelId
      (channel) => channel._id === message.channelId
    );
  
    if (index !== -1 && index !== undefined) {
      const channelToMove = state.channelContacts[index];
      state.channelContacts.splice(index, 1);      // Remove the channel from its current position
      state.channelContacts.unshift(channelToMove);
    }
    console.log(channelToMove,index , "Channel moved to top:", state.channelContacts);
  }


  },
});

export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  closeSelectedChat,
  addMessage,
  setDirectMessageContacts,
  setChannelContacts,
  addChannel,
  moveChannelToTop
} = chatSlice.actions;

export default chatSlice.reducer;
