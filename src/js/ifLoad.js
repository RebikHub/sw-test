export default class Loading {
  constructor(server) {
    this.server = server;
    this.buttonUpdate = document.querySelector('.header-update');
    this.newsList = document.querySelector('.list-news');
    this.waitNewsBox = document.querySelector('.wait-news');
    this.noResponse = document.querySelector('.no-response');
    this.news = null;
  }

  events() {
    this.renderWaitNews();
    this.responseNews();
    this.clickBtnUpdate();
  }

  async responseNews() {
    const news = await this.server.loadNews();
    if (news) {
      this.noResponse.classList.add('none');
      this.newsList.textContent = null;
      this.renderNews(news);
    } else {
      this.noResponse.classList.remove('none');
    }
  }

  clickBtnUpdate() {
    this.buttonUpdate.addEventListener('click', () => {
      this.newsList.textContent = null;
      this.renderWaitNews();
      this.responseNews();
    });
  }

  renderWaitNews() {
    for (let i = 0; i < 3; i += 1) {
      const clone = this.waitNewsBox.cloneNode(true);
      clone.classList.remove('none');
      this.newsList.append(clone);
    }
  }

  renderNews(arrayNews) {
    this.waitNewsBox.classList.add('none');
    for (let i = 0; i < arrayNews.length; i += 1) {
      this.newsList.append(Loading.createNews(arrayNews[i]));
    }
  }

  static createNews(news) {
    const divNews = document.createElement('div');
    const divDate = document.createElement('div');
    const bodyNews = document.createElement('div');
    const image = document.createElement('img');
    const text = document.createElement('p');
    divDate.textContent = Loading.getDate(news.date);
    image.src = news.img;
    text.textContent = news.text;
    bodyNews.className = 'news-body';
    image.className = 'news-img';
    bodyNews.append(image);
    bodyNews.append(text);
    divNews.append(divDate);
    divNews.append(bodyNews);
    return divNews;
  }

  static getDate(time) {
    const year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let day = new Date(time).getDate();
    let hours = new Date(time).getHours();
    let minute = new Date(time).getMinutes();

    if (String(month).length === 1) {
      month = `0${month}`;
    }
    if (String(day).length === 1) {
      day = `0${day}`;
    }
    if (String(minute).length === 1) {
      minute = `0${minute}`;
    }
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    return `${hours}:${minute} ${day}.${month}.${String(year).slice(2)}`;
  }
}
