export default class Server {
  constructor() {
    this.url = 'http://localhost:3000/news';
  }

  async loadNews() {
    try {
      const news = await fetch(this.url);
      console.log(news.ok);
      return news.json();
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
