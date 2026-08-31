import { injectable } from "tsyringe";
import cloudinary from "../config/cloudinary.ts";
import type {
  IImageService,
  UploadImageResponse,
} from "../interfaces/services/IImageService.ts";

@injectable()
export class ImageService implements IImageService {

  async uploadImage(
    file: Express.Multer.File
  ): Promise<UploadImageResponse> {

    return new Promise((resolve, reject) => {

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "trainer-avatars",
        },
        (error, result) => {

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

        }
      );

      uploadStream.end(file.buffer);

    });

  }

  async deleteImage(publicId: string): Promise<void> {

    await cloudinary.uploader.destroy(publicId);

  }

}