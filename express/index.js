import express from "express";
import { info01, info02 } from "./controller/info.js";

const serverPort = 3001;

const greenLog = '\x1b[32m%s\x1b[0m';

const app = express();

app.use('/static', express.static(`${process.cwd()}/static`));

app.use('/api/info', info01);

app.use('/api/infoList', info02);

app.use('*', (_, res) => res.send('404 :('));

app.listen(serverPort, () => {
    console.log(greenLog, `mock server start :) . listen ${serverPort}`);
});