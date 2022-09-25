import { withIronSessionApiRoute } from 'iron-session/next';
import AppWrite, { Query } from 'node-appwrite';
import { initAppwriteServer } from '../../../lib/appwrite';
import sessionOptions from '../../../lib/iron/config';

export default withIronSessionApiRoute(async (req, res) => {
  try {
    const { user } = req.session;
    if (!user) {
      res.status(401).send('Not Authenticated.');
    }
    const sdk = initAppwriteServer();
    const databases = new AppWrite.Databases(sdk);
    const data = await databases.listDocuments(
      process.env.APPWRITE_DATABASE,
      process.env.APPWRITE_BAROMETER,
      [
        Query.orderDesc('$id'),
        Query.limit(req.query.size),
      ],
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
}, sessionOptions);
