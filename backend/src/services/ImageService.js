var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "tsyringe";
import cloudinary from "../config/cloudinary.js";
let ImageService = class ImageService {
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: "trainer-avatars",
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (!result) {
                    return reject(new Error("Image upload failed"));
                }
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            });
            uploadStream.end(file.buffer);
        });
    }
    async deleteImage(publicId) {
        await cloudinary.uploader.destroy(publicId);
    }
};
ImageService = __decorate([
    injectable()
], ImageService);
export { ImageService };
//# sourceMappingURL=ImageService.js.map