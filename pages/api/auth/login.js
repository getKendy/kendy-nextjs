import { Account } from 'appwrite';

import { withIronSessionApiRoute } from 'iron-session/next';
import { initAppwriteClient } from '../../../lib/appwrite';
import sessionOptions from '../../../lib/iron/config';

export default withIronSessionApiRoute(
  async (req, res) => {
    try {
      const sdk = initAppwriteClient();
      const account = new Account(sdk);
      const { email, password } = req.body;
      const user = await account.createEmailSession(email, password);
      req.session.user = user;
      await req.session.save();
      res.status(200).send(user);
    } catch (error) {
      req.session.destroy();
      res.status(500).send({ error });
    }
  }, sessionOptions);
