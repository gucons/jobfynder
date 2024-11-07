'use client'
import { createContext, use, useEffect, useState } from 'react'

import { getUserById } from '@/helpers/data'
import type { ChatContextType, ChatOffcanvasStatesType, OffcanvasControlType } from '@/types/context'
import type { UserType } from '@/types/data'
import type { ChildrenType } from '@/types/component'

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChatContext = () => {
  const context = use(ChatContext)
  if (!context) {
    throw new Error('useChatContext can only be used within ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }: ChildrenType) => {
  const [activeChat, setActiveChat] = useState<UserType>()
  const [offcanvasStates, setOffcanvasStates] = useState<ChatOffcanvasStatesType>({
    showChatList: false,
    showMessageToast: false,
  })

  const changeActiveChat = async (userId: UserType['id']) => {
    const user = await getUserById(userId)
    if (user) setActiveChat(user)
  }

  const toggleChatList: OffcanvasControlType['toggle'] = () => {
    setOffcanvasStates({ ...offcanvasStates, showChatList: !offcanvasStates.showChatList })
  }

  const toggleMessageToast: OffcanvasControlType['toggle'] = () => {
    setOffcanvasStates({ ...offcanvasStates, showMessageToast: !offcanvasStates.showMessageToast })
  }

  const chatList: ChatContextType['chatList'] = {
    open: offcanvasStates.showChatList,
    toggle: toggleChatList,
  }

  const chatToast: ChatContextType['chatToast'] = {
    open: offcanvasStates.showMessageToast,
    toggle: toggleMessageToast,
  }

  useEffect(() => {
    changeActiveChat('102')
  }, [])

  return (
    <ChatContext.Provider
      value={{
        activeChat,
        changeActiveChat,
        chatList,
        chatToast,
      }}>
      {children}
    </ChatContext.Provider>
  )
}
