import * as https from 'https';
import { HttpService } from '@nestjs/axios';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

export default httpsAgent;