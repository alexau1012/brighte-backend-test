import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';
import { validateData } from './validation';

export const getAllReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();

  res.json(referrals);
};

export const getReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const referral = await prisma.referral.findUnique({
    where: { id: Number(id) },
  });

  res.json(referral);
};

export const updateReferrerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = await validateData(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id }: { id?: number } = req.params;

    const updateReferral = await prisma.referral.update({
      where: { id: Number(id) },
      data: {
        givenName: req.body.givenName,
        surName: req.body.surName,
        email: req.body.email,
        phone: req.body.phone,
        addressLine: req.body.addressLine,
        suburb: req.body.suburb,
        state: req.body.state,
        postCode: req.body.postCode,
        country: req.body.country,
      }
    });

    res.status(200).json(updateReferral);
  } catch (err) {
    next(err);
  }
};

export const deleteReferralById = async (req: Request, res: Response, next: NextFunction) => {  
  try {
    const { id }: { id?: number } = req.params;

    await prisma.referral.delete({
      where: { id: Number(id) },
    });
  
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json('Referrer ID does not exist');
    }
    next(err);
  }
}

export const createReferral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = await validateData(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newReferral = await prisma.referral.create({
      data: {
        givenName: req.body.givenName,
        surName: req.body.surName,
        email: req.body.email,
        phone: req.body.phone,
        addressLine: req.body.addressLine,
        suburb: req.body.suburb,
        state: req.body.state,
        postCode: req.body.postCode,
        country: req.body.country,
      }
    })

    res.status(201).json(newReferral);
  } catch (err) {
    next(err);
  }
}
