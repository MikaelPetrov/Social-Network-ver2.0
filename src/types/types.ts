export type DialogType = {  //  dialogs-reducer
    id: number
    name: string
}

export type MessageType = {  //  dialogs-reducer
    id: number
    message: string
}

export type PostType = {  //  profile-reducer
    id: number
    message: string
    likesCount: number
}

export type ContactType = {  //  profile-reducer
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotoType = {  //  profile-reducer, users-reducer
    small: string | null
    large: string | null
}

export type ProfileType = {  //  profile-reducer
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotoType
}

export type UserType = {  //  users-reducer
    id: number
    name: string
    uniqueUrlName: string
    status: string
    followed: boolean
    photos: PhotoType
}














