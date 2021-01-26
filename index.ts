import app from './app';
import * as db from './database/database';

const PORT = process.env.PORT || 6200;

db.connect().then(() => {
   app.listen(PORT, async () => {
      console.log('Server has been started successful');
   });
}).catch((e) => {
   console.log(`Error: ${e.message}`);
});
