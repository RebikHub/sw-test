import Loading from './ifLoad';
import Server from './server';

console.log('app started');

const server = new Server();
const load = new Loading(server);

load.events();

(async () => {
  if (navigator.serviceWorker) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/service-worker.js');
        console.log('sw registered');
      } catch (e) {
        console.log(e);
      }
    });
  }
})();
