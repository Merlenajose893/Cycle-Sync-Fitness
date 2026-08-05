export interface TrainerPublicProfile {
    _id: string
    firstName: string
    lastName: string
    email: string
    specialization: string
    bio: string
    avatar?: string
    experience: number
    rating?: number
    status: string
}

export interface TrainerPackage {
    _id: string
    trainerId: string
    packageName: string
    description: string
    durationDays: number
    price: number
    features: string[]
    maxClients?: number
    isActive: boolean
}
