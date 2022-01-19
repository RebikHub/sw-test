import Loading from './ifLoad';
import Server from './server';

console.log('app started');

const server = new Server();
const load = new Loading(server);

// load.events();

(async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register('./service.worker.js');
        console.log(reg);
        console.log('sw registered');
      } catch (e) {
        console.log(e);
      }
    });
  }
})();

load.events();
