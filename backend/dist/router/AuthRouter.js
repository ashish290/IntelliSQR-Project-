"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.AuthRouter = router;
router.post("/login", AuthController_1.UserLogin);
router.post("/signup", AuthController_1.UserSignup);
router.post("/logout", middleware_1.Authenticate, AuthController_1.UserLogout);
router.get("/", (req, res) => {
    res.json({ msg: "Auth working..." });
});
//# sourceMappingURL=AuthRouter.js.map