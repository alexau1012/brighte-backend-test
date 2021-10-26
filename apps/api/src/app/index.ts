import * as cors from 'cors';
import * as express from 'express';

import * as referralsApi from './referrals/api';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', referralsApi.getAllReferrals);
app.post('/referrals', referralsApi.createReferral);
app.get('/referrals/:id', referralsApi.getReferralById);
app.patch('/referrals/:id', referralsApi.updateReferrerById);
app.post('/referrals/:id/delete', referralsApi.postDeleteReferralById);

export default app;
