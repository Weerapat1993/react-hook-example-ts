import logger from 'use-reducer-logger';

export const cofingLogger = (reducer) => process.env.NODE_ENV === 'development' ? logger(reducer) : reducer

