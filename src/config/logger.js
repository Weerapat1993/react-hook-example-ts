import logger from 'use-reducer-logger';

export const configLogger = (reducer) => process.env.NODE_ENV === 'development' ? logger(reducer) : reducer

