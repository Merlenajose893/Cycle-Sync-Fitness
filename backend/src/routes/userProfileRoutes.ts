import { Router } from "express";
import { container } from "tsyringe";
import { UserProfileController } from "../controllers/UserProfileController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { validate } from "../middlewares/validate.ts";
import { upload } from "../middlewares/upload.ts";
import { updateUserProfileSchema } from "../validators/userprofile.validator.ts";
const router=Router();
const userprofilecontroller=container.resolve(UserProfileController);

router.get("/profile",authMiddleware,userprofilecontroller.getProfile);
router.patch("/profile",authMiddleware,validate(updateUserProfileSchema),userprofilecontroller.updateProfile);
router.patch("/profile/avatar",authMiddleware,upload.single("avatar"),userprofilecontroller.uploadAvatar);
router.delete("/profile/avatar",authMiddleware,userprofilecontroller.deleteAvatar);

export default router;