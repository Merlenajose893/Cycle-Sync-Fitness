export interface UpdateTrainerProfileDTO{
    bio?:string;
    experience?:string;
    location?:string;
    avatar?:string;
    speciality?:string;
    languages?:string[];
    tags?:string[];
}

export interface CertificateItems{
    title:string;
    issuedBy:string;
    year:string;
}

export interface UpdateTrainerCertificateDTO{
    certifications:CertificateItems[]
}

export interface PackageItem{
    name:string;
    sessions:number;
    duration:string;
    price:number;
    popular?:boolean;
}

export interface UpdateTrainerPackageDTO{
    packages:PackageItem[]
}

export interface TrainerOnboardingStatus{
    onboardingCompleted:boolean;
    onboardindStep:number;
    profile?:UpdateTrainerProfileDTO;
    certifications?:CertificateItems[];
    packages?:PackageItem[]
}
