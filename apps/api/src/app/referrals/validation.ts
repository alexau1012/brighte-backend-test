import prisma from '../prisma';
import { check, validationResult } from 'express-validator';
import { Request } from 'express';

export const validateReferralData = async (req: Request) => {
    await check('givenName', 'Given name is required and must be between 2 to 200 characters long').isLength({ min: 2, max: 200 }).run(req);

    await check('surName', 'Surname is required and must be between 2 to 200 characters long').isLength({ min: 2, max: 200 }).run(req);

    await check('email', 'Invalid email').isEmail().run(req);

    await check('email', 'Email is already in use').custom(async (value) => {
      const emailInUse = await prisma.referral.findFirst({
        where: { email: value },
      });
      if (emailInUse) {
        throw new Error();
      }
    }).run(req);

    await check('phone', 'Invalid Australia phone number').custom(async (value) => {
      const regex = RegExp(/^\d{8}$|^\d{10}$/);
      if (!regex.exec(value)) throw new Error();
    }).run(req);

    return validationResult(req);
};