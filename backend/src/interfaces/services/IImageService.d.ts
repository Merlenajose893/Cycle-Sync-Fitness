export interface UploadImageResponse {
    url: string;
    publicId: string;
}
export interface IImageService {
    uploadImage(file: Express.Multer.File): Promise<UploadImageResponse>;
    deleteImage(publicId: string): Promise<void>;
}
//# sourceMappingURL=IImageService.d.ts.map