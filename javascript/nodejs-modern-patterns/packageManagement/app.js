// Clean internal imports that don't break when you reorganize
import config from '#config';
import { log  } from '#utils/logger';
import {getConnection} from '#db';

config.setConfig();
getConnection();
log("in app logging!!!");

