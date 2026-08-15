import { Router } from "express";
import { container } from "tsyringe";
import { UserProfileController } from "../controllers/UserProfileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { upload } from "../middlewares/upload.js";
import { updateUserProfileSchema } from "../validators/userprofile.validator.js";
const router = Router();
const userprofilecontroller = container.resolve(UserProfileController);
router.get("/profile", authMiddleware, userprofilecontroller.getProfile);
router.patch("/profile", authMiddleware, validate(updateUserProfileSchema), userprofilecontroller.updateProfile);
router.patch("/profile/avatar", authMiddleware, upload.single("avatar"), userprofilecontroller.uploadAvatar);
router.delete("/profile/avatar", authMiddleware, userprofilecontroller.deleteAvatar);
export default router;
//# sourceMappingURL=userProfileRoutes.js.map