import { authOptions } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.send({ message: 'You must be logged in.' });
  } else {
    return res.send({ message: 'Success' });
  }
};
export default handler;
