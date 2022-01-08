import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@wealthface/common";
import { Password } from "../../../services/password";
import jwt from "jsonwebtoken";
import UserRapo from "../../../src/repos/user-rapo";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await UserRapo.findByEmail(email);
    
    if (existingUser.length !== 1) {
      throw new BadRequestError("Invalid credentials email");
    }

    const passwordsMatch = await Password.compare(
      existingUser[0].password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials Pass");
    }

    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(existingUser);
  }
);

export { router as signinRouter };
