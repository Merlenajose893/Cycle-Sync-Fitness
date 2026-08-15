import type { IImageService, UploadImageResponse } from "../interfaces/services/IImageService.js";
export declare class ImageService implements IImageService {
    uploadImage(file: Express.Multer.File): Promise<UploadImageResponse>;
    deleteImage(publicId: string): Promise<void>;
}
//# sourceMappingURL=ImageService.d.ts.map