export interface UpdateTrainerProfileDTO{
    bio?:string;
    experience?:string;
    loaction?:string;
    avatar?:string;
    speciality?:string;
    languages?:string[];
    tags?:string[];
}

export interface CertificationItem{
    title:string;
    issuedBy:string;
    year:string;
}

export interface UpdateTrainerCertificateDTO{
    certifications:CertificationItem[];
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