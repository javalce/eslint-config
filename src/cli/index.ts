import { logger } from './utils/logger';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main(): Promise<void> {
  throw new Error('Not implemented');
}

main().catch(logger.error);
