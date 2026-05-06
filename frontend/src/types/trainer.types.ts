export interface TrainerPackage{
    name:string;
    sessions:number;
    duration:string;
    price:number;
    popular?:boolean
}

export interface Certificate{
    title:string;
    issuedBy:string;
    year:string;
}

export interface Trainer{
    _id:string;
    firstname:string;
    lastName:string;
    email:string;
    speciality:string;
    avatar?:string;
    bio?:string;
    experience:string;
    tags:string[];
    location:string;
    languages:string[];
    rating:number;
    reviews:number;
    sessionsCompleted:number;
    activeClients:number;
    isAvailable:boolean;
    featured:boolean;
    packages:TrainerPackage[];
    certifications:Certificate[];
    createdAt:string;
    updatedAt:string;
}