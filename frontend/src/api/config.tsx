export type ListResponseProps<T> = {
    data_list: T[]
    total: number
    page: number
    pages: number
}

export const TODO_URL = '/api/v1/todos'
export type TodoResponseProps = {
    id: number
    title: string
    description: string
    done: boolean
}

export const SIGNUP_URL = '/api/signup'
export type SignupResponseProps = {
    username: string
    password: string
}

export const LOGIN_URL = '/api/token'
export type LoginResponseRrops = {
    username: string
    role: string
    access_token: string
    // refresh_token: string //TODO
    token_type: string
}

export const USERS_URL = '/api/v1/users'
export type UsersResponseProps = {
    email: string
    is_active: boolean
    is_superuser: boolean
    first_name: string
    last_name: string
    id: number
}

export const TASK_URL = '/api/v1/task'
export type TaskResponseProps = {
    message: string
}

export const AI_CHARACTERS_URL = '/api/v1/ai_characters'
export type AiCharacterResponseProps = {
    id: number
    name: string
    description: string
    profile_image: string
    images: string[]
}

export const LEVELS_URL = '/api/v1/levels'
export type LevelsResponseProps = {
    id: number
    name: string
}


export const IMAGE_UPLOAD_URL = '/api/v1/upload'
export type ImageUploadResponseProps = {
    data: {
        uri: string
    }
}


export const TABS_URL = '/api/v1/tabs'
export type TabsResponseProps = {
    id: number
    name: string
}
