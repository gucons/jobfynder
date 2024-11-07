import { celebrationData } from '@/assets/data/celebrations'
import { notificationData } from '@/assets/data/notification'
import { eventScheduleData, mediaData, userConnections, users } from '@/assets/data/other'
import { blogsData, eventData, groupsData, postVideosData, socialCommentsData, socialPostsData, trendingVideos } from '@/assets/data/social'
import type {
  BlogType,
  CelebrationType,
  CommentType,
  ConnectionsType,
  EventType,
  GroupType,
  MediaType,
  NotificationType,
  ScheduleType,
  SocialPostType,
  UserType,
  VideoType,
} from '@/types/data'
import { sleep } from '@/utils/promise'

export const getAllUsers = async (): Promise<UserType[]> => {
  await sleep()
  return users
}

export const getAllNotifications = async (): Promise<NotificationType[]> => {
  await sleep()
  return notificationData
}

export const getAllEvents = async (): Promise<EventType[]> => {
  await sleep()
  return eventData
}

export const getEventById = async (id: EventType['id']): Promise<EventType | undefined> => {
  const data = eventData.find((event) => event.id === id)
  await sleep()
  return data
}

export const getGroupById = async (id: GroupType['id']): Promise<GroupType | undefined> => {
  const data = groupsData.find((group) => group.id === id)
  await sleep()
  return data
}

export const getAllGroups = async (): Promise<GroupType[]> => {
  await sleep()
  return groupsData
}

export const getAllMedia = async (): Promise<MediaType[]> => {
  await sleep()
  return mediaData
}

export const getAllBlogs = async (): Promise<BlogType[]> => {
  await sleep()
  return blogsData
}

export const getAllEventSchedules = async (): Promise<ScheduleType[]> => {
  const data = eventScheduleData.map((schedule) => {
    const user = users.find((user) => user.id === schedule.userId)
    const speakers = schedule.speakerId.map((speaker) => {
      const teamSpeaker = users.find((user) => user.id === speaker)
      if (teamSpeaker) {
        return teamSpeaker
      }
    })
    return {
      ...schedule,
      user,
      speakers,
    }
  })
  await sleep()
  return data
}

export const getAllUserConnections = async (): Promise<ConnectionsType[]> => {
  const data = userConnections.map((connection) => {
    const user = users.find((user) => user.id === connection.userId)
    return {
      ...connection,
      user,
    }
  })
  await sleep()
  return data
}

export const getAllCelebrations = async (): Promise<CelebrationType[]> => {
  const data = celebrationData.map((celebration) => {
    const user = users.find((user) => user.id === celebration.userId)
    return {
      ...celebration,
      user,
    }
  })
  await sleep()
  return data
}

export const getAllTrendingVideos = async (): Promise<VideoType[]> => {
  const data = trendingVideos.map((video) => {
    const user = users.find((user) => user.id === video.userId)
    return {
      ...video,
      user,
    }
  })
  await sleep()
  return data
}

export const getAllPostVideos = async (): Promise<VideoType[]> => {
  const data = postVideosData.map((video) => {
    const user = users.find((user) => user.id === video.userId)
    return {
      ...video,
      user,
    }
  })
  await sleep()
  return data
}

export const getUserById = async (id: UserType['id']): Promise<UserType | undefined> => {
  const data = users.find((user) => user.id === id)
  await sleep()
  return data
}

export const getBlogById = async (id: BlogType['id']): Promise<BlogType | undefined> => {
  const data = blogsData.find((blog) => blog.id === id)
  await sleep()
  return data
}

export const getUserForAllComments = (commentsData: CommentType[]): CommentType[] => {
  return commentsData.map((comment) => {
    const socialUser = users.find((user) => user.id === comment.socialUserId)
    if (comment.children) {
      comment.children = getUserForAllComments(comment.children)
    }
    return {
      ...comment,
      socialUser,
    }
  })
}

export const getAllFeeds = async (): Promise<SocialPostType[]> => {
  const data = socialPostsData.map((post) => {
    const socialUser = users.find((user) => user.id === post.socialUserId)
    const commentsData = socialCommentsData.filter((comment) => comment.postId === post.id)
    let comments: CommentType[] | undefined
    if (commentsData.length) {
      comments = getUserForAllComments(commentsData)
    }
    return {
      ...post,
      socialUser,
      comments,
    }
  })
  await sleep()
  return data
}
