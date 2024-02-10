import { registerServiceWorker } from './modules/registerServiceWorker';
import { loggedHeader } from './modules/loggedHeader';
import { coprCurrentYear } from './modules/coprCurrentYear';

registerServiceWorker();
loggedHeader();
coprCurrentYear();
