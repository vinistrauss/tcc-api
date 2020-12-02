import app from './app';
import createLogger from './app/errors/logger';

app.listen(3333, () => createLogger.log('info', `server running in 3333 🚀`));
