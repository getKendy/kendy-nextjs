import { withIronSessionApiRoute } from 'iron-session/next';
import sessionOptions from '../../../lib/iron/config';

async function logoutRoute(req, res) {
  req.session.destroy();
  res.json({ user: null });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
