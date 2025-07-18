import { ChatProps, MessageProps } from "@/types/chatinterfaces";
import { DashboardData } from "@/types/dashboard";

import { GigProps } from "@/types/giginterface";
import { initialState, StoreState } from "@/types/storeinterface";
import { Review, UserProps } from "@/types/userinterfaces";
import { create } from "zustand"; // Import SetState

const useStore = create<StoreState>((set) => ({
  ...initialState,
  // ... other state ...
  paymentConfirmations: {},

  setConfirmedParty: (gigId, status) =>
    set((state) => ({
      paymentConfirmations: {
        ...state.paymentConfirmations,
        [gigId]: {
          ...(state.paymentConfirmations[gigId] || { canFinalize: false }),
          confirmedParty: status,
        },
      },
    })),

  setCanFinalize: (gigId, canFinalize) =>
    set((state) => ({
      paymentConfirmations: {
        ...state.paymentConfirmations,
        [gigId]: {
          ...(state.paymentConfirmations[gigId] || { confirmedParty: "none" }),
          canFinalize,
        },
      },
    })),

  resetConfirmationState: (gigId) =>
    set((state) => {
      const newConfirmations = { ...state.paymentConfirmations };
      delete newConfirmations[gigId];
      return { paymentConfirmations: newConfirmations };
    }),
  showPaymentConfirmation: false,
  setShowPaymentConfirmation: (data: boolean) =>
    set(() => ({ showPaymentConfirmation: data })),
  setcancelationreason: (reason) => set({ cancelationreason: reason }),
  setShowCancelGig: (data: boolean) => set(() => ({ cancelGig: data })),
  setShowConfetti: (data: boolean) => set(() => ({ showConfetti: data })),
  setShowOfflineNotification: (data: boolean) =>
    set(() => ({ showOfflineNotification: data })),
  setTrialRemainingDays: (days: number | null) =>
    set({ trialRemainingDays: days }),
  setShowTrialModal: (data: boolean) => set({ showTrialModal: data }),

  setisSchedulerOpen: (data: boolean) => set(() => ({ isSchedulerOpen: data })),
  setLastBookedGigId: (data: string | null) =>
    set(() => ({ lastBookedGigId: data })),
  setShowConfirmation: (data: boolean) =>
    set(() => ({ showConfirmation: data })),
  setData: (data: DashboardData) => set(() => ({ subscriptiondata: data })),
  setLoadingPostId: (data: string) => set(() => ({ loadingPostId: data })),
  setIsProfileModalOpen: (data: boolean) =>
    set(() => ({ IsProfileModalOpen: data })),
  setLoadPostId: (data: string) => set(() => ({ loadPostId: data })),
  setIsDescriptionModal: (data: boolean) =>
    set(() => ({ isDescriptionModal: data })),
  setShowConfirmModal: (data: boolean) =>
    set(() => ({ showConfirmModal: data })),
  setConfirmEdit: (data: boolean) => set(() => ({ confirmEdit: data })),
  setVideoModalOpen: (data: boolean) => set(() => ({ videoModalOpen: data })),
  setReviewModalOpen: (data: boolean) => set(() => ({ reviewModalOpen: data })),
  setRefferenceModalOpen: (data: boolean) =>
    set(() => ({ refferenceModalOpen: data })),
  setShowUpload: () =>
    set((state: StoreState) => ({ showUpload: !state.showUpload })),
  setIsOpen: (data: boolean) => set(() => ({ isOpen: data })),
  setRefetchData: (data: boolean) => set(() => ({ refetchData: data })),
  setCurrentFollowers: (data: boolean) =>
    set(() => ({ currentFollowers: data })),
  setShowModal: (data: boolean) => set(() => ({ showModal: data })),
  setShowVideo: (data: boolean) => set(() => ({ showVideo: data })),
  setSelectedReview: (data: Review) => set(() => ({ selectedReview: data })),
  setSearch: (data: boolean) => set(() => ({ search: data })),
  setFollow: (data: boolean) => set(() => ({ follow: data })),
  setCurrentUser: (data: Partial<UserProps>) =>
    set((state: StoreState) => ({
      currentUser: { ...state.currentUser, ...data },
    })),
  setCurrentGig: (data: Partial<GigProps>) =>
    set((state: StoreState) => ({
      currentgig: { ...state.currentgig, ...data },
    })),
  setSearchQuery: (data: string) => set(() => ({ searchQuery: data })),
  setModalVisible: (data: boolean) => set(() => ({ modalVisible: data })),
  setDrawerVisible: () =>
    set((state: StoreState) => ({ drawerVisible: !state.drawerVisible })),
  setFollowersModal: (data: boolean) => set(() => ({ followersModal: data })),
  setFollowingsModal: (data: boolean) => set(() => ({ followingsModal: data })),
  setRefetchGig: (data: boolean) => set(() => ({ refetchGig: data })),
  setMessages: (data: MessageProps[]) => set(() => ({ messages: data })),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  unreadCounts: {},
  // Add this new action to reset unread count
  resetUnreadCount: (chatId: string) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [chatId]: 0,
      },
    })),
  updateUnreadCount: (chatId, increment = true) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [chatId]: increment ? (state.unreadCounts[chatId] || 0) + 1 : 0,
      },
    })),
  // In your Zustand store

  // Add gigs to store
  setGigs: (gigs) => set({ gigs }),

  // Update gig status (works for both local and socket updates)
  updateGigStatus: (gigId: string, updates: Partial<GigProps>) => {
    set(
      (state: StoreState) =>
        ({
          ...state,
          gigs: state.gigs.map((gig) =>
            gig._id === gigId ? { ...gig, ...updates } : gig
          ),
        } as StoreState)
    ); // Explicitly type the return value
  },
  addChat: (chat: ChatProps) =>
    set((state: StoreState) => ({
      chats: { ...state.chats, [chat.chatId]: chat },
    })),
  // clearChat: (chatId) =>
  //   set((state) => ({
  //     clearedChats: [...state.clearedChats, chatId],
  //   })),
  // addMessage: (newMessage) => {
  //   set((state: StoreState) => {
  //     // Check if message already exists
  //     const existingMessage = state.messages.find(
  //       (msg: MessageProps) =>
  //         msg._id === newMessage._id || msg.tempId === newMessage.tempId
  //     );

  //     if (existingMessage) return state; // Prevent duplicate message

  //     return { messages: [...state.messages, newMessage] };
  //   });
  // },
  fetchMessages: async (chatId: string) => {
    try {
      const res = await fetch(`/api/chat/getmessages?chatId=${chatId}`);
      if (!res.ok) throw new Error("Failed to fetch messages");

      const { messages } = await res.json();
      set((state: StoreState) => ({
        messages,
        chats: {
          ...state.chats,
          [chatId]: {
            ...state.chats[chatId],
            messages,
          },
        },
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Optionally, set an error state or retry logic
    }
  },

  // In your Zustand store (useStore.ts)
  addMessage: (newMessage) => {
    console.log("🟠 Adding new message to Zustand store:", newMessage);
    console.log("New Message ID:", newMessage._id);
    console.log("New Message Temp ID:", newMessage.tempId);

    set((state) => {
      const isDuplicate = state.messages.some(
        (msg) =>
          (msg._id && newMessage._id && msg._id === newMessage._id) || // Check for _id match
          (msg.tempId && newMessage.tempId && msg.tempId === newMessage.tempId) // Check for tempId match
      );

      if (isDuplicate) {
        console.log("🟡 Duplicate message detected, skipping update.");
        return state;
      }

      console.log("🟢 Adding new message to Zustand store.");
      const chatId = newMessage.chatId as string;
      return {
        messages: [...state.messages, newMessage],
        chats: {
          ...state.chats,
          [chatId]: {
            ...state.chats[chatId],
            messages: [...(state.chats[chatId]?.messages || []), newMessage],
          },
        },
      };
    });
  },

  // In your Zustand store (useStore.ts)
  // In your Zustand store (useStore.ts)
  // In your Zustand store (useStore.ts)
  // In your Zustand store (useStore.ts)
  // In your Zustand store (useStore.ts)
  sendMessage: async (newMessage: MessageProps) => {
    // const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`; // Unique tempId
    // const optimisticMessage = { ...newMessage, tempId }; // Add tempId to the optimistic message

    // console.log("🟠 Adding optimistic message with tempId:", tempId);

    // // Optimistically update UI (only for the sender)
    // set((state: StoreState) => {
    //   const existingChat = state.chats?.[newMessage.chatId as string] ?? {
    //     messages: [],
    //   };

    //   return {
    //     messages: [...state.messages, optimisticMessage],
    //     chats: {
    //       ...state.chats,
    //       [newMessage.chatId as string]: {
    //         ...existingChat,
    //         messages: [...(existingChat.messages ?? []), optimisticMessage],
    //       },
    //     },
    //   };
    // });

    // Send the message to the server
    try {
      const res = await fetch("/api/messages/sendmessages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const savedMessage = await res.json();
      console.log("🟢 Message sent successfully:", savedMessage);

      // Replace optimistic message with real one
      // set((state: StoreState) => ({
      //   messages: state.messages.map((msg) =>
      //     msg.tempId === tempId ? savedMessage : msg
      //   ),
      //   chats: {
      //     ...state.chats,
      //     [savedMessage.chatId]: {
      //       ...state.chats?.[savedMessage.chatId],
      //       messages: state.chats?.[savedMessage.chatId]?.messages?.map((msg) =>
      //         msg.tempId === tempId ? savedMessage : msg
      //       ) ?? [savedMessage],
      //     },
      //   },
      // }));
    } catch (error) {
      console.error("Error sending message:", error);

      // // Remove optimistic message if request fails
      // set((state: StoreState) => ({
      //   messages: state.messages.filter((msg) => msg.tempId !== tempId),
      // }));
    }
  },

  updateMessageReaction: async (
    messageId: string,
    emoji: string,
    setShowReaction: (response: { success: boolean; message: string }) => void
  ) => {
    console.log("updateMessageReaction ", messageId, emoji);

    try {
      const res = await fetch(`/api/messages?messageId=${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
      });

      if (!res.ok) throw new Error("Failed to update message reaction");

      const data = await res.json();
      console.log(data);

      setTimeout(() => {
        setShowReaction({
          success: false,
          message: "",
        });
      }, 3000);
      // Call the callback function with success status
      setShowReaction({
        success: true,
        message: data.message,
      });
    } catch (error) {
      console.error("Error updating message reaction:", error);

      // Handle failure case
      setShowReaction({
        success: false,
        message: "Failed to update reaction",
      });
    }
  },
}));

export default useStore;
