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

export type PhotosType = {  //  profile-reducer, users-reducer
    small: string | null
    large: string | null
}

export type PostType = {  //  profile-reducer
    id: number
    message: string
    likesCount: number
}

export type ProfileType = {  //  profile-reducer
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
    aboutMe: string
}

export type UserType = {  //  users-reducer
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
