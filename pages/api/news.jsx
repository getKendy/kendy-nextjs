import connect from 'next-connect';
import cors from 'cors';

const handler = connect();

handler.use(cors());

handler.get(async (req, res) => {
  // Fetch news data from an API or database
  const news = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=76bc65a61ba549c489e6738da9d45aec');
  const data = await news.json();

  res.json(data);
});

export default handler;
