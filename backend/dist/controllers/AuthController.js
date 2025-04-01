"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogout = exports.UserSignup = exports.UserLogin = void 0;
const utils_1 = require("../utils");
const Database_1 = require("../services/Database");
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ required: "Email and Password are required" });
            return;
        }
        const exisitingUser = yield Database_1.prisma.user.findUnique({
            where: { email },
        });
        if (exisitingUser) {
            console.log("User found:", exisitingUser);
            const ExistPassword = exisitingUser.password;
            const salt = exisitingUser.salt;
            if (!ExistPassword || !salt) {
                res.status(500).json({ error: "User password or salt is missing" });
                return;
            }
            const isPasswordValid = yield (0, utils_1.GeneratePassword)(password, salt);
            if (isPasswordValid === ExistPassword) {
                const signature = yield (0, utils_1.GenerateSignature)({
                    id: exisitingUser.id,
                    email: exisitingUser.email,
                });
                console.log("Signature:", signature);
                res.cookie("jwt", signature, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                });
                res.status(200).json({
                    user: {
                        id: exisitingUser.id,
                        email: exisitingUser.email,
                    },
                    success: "User logged in successfully",
                    signature: signature,
                });
            }
            else {
                res.status(401).json({ error: "Invalid password" });
                return;
            }
        }
        else {
            res.status(400).json({ error: "User not found" });
            return;
        }
    }
    catch (error) {
        console.log("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.UserLogin = UserLogin;
const UserSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ required: "All field are required" });
            return;
        }
        const exisitingUser = yield Database_1.prisma.user.findUnique({
            where: { email },
        });
        if (exisitingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        else {
            const salt = yield (0, utils_1.GenerateSalt)();
            const hashedPassword = yield (0, utils_1.GeneratePassword)(password, salt);
            const newUser = yield Database_1.prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    salt: salt,
                },
            });
            if (newUser) {
                const signature = yield (0, utils_1.GenerateSignature)({
                    id: newUser.id,
                    email: newUser.email,
                });
                console.log(process.env.NODE_ENV);
                res.cookie("jwt", signature, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                });
                res.status(201).json({
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                    },
                    success: "User created successfully",
                    signature: signature,
                });
            }
        }
    }
    catch (error) {
        console.log("Signup Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.UserSignup = UserSignup;
const UserLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res) {
            res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "none" });
            res.status(200).json({ success: "User Logout Successfully..." });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.UserLogout = UserLogout;
//# sourceMappingURL=AuthController.js.map