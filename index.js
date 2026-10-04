require('dotenv').config();
require('./setting/config');
const fs = require('fs');
const chalk = require('chalk');
const { autoLoadPairs } = require('./autoload');

async function start() {
  console.log(chalk.cyan('╔══════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.bold.white('          ☠︎︎ ANNIE MD ☠ TELEGRAM BOT         ') + chalk.cyan('║'));
  console.log(chalk.cyan('╚══════════════════════════════════════════════╝'));
  if (!fs.existsSync('./token.js') && !process.env.BOT_TOKEN && !process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram token missing: add token.js or BOT_TOKEN environment variable.');
  }
  try {
    await autoLoadPairs();
    console.log(chalk.green('✅ Existing WhatsApp sessions loaded.'));
  } catch (error) {
    console.log(chalk.yellow('⚠️ Existing sessions could not be auto-loaded:'), error.message);
  }
  require('./drenox');
  console.log(chalk.green('✅ WhatsApp command system loaded.'));
  require('./bot');
  console.log(chalk.green('✅ Telegram pairing bot started.'));
  console.log(chalk.cyan('✅ Telegram pairing is active; use /start or /pair.'));
}
process.on('unhandledRejection', (reason) => console.error('Unhandled Promise Rejection:', reason));
process.on('uncaughtException', (error) => { console.error('Fatal error:', error); process.exitCode = 1; });
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
start().catch((error) => { console.error(chalk.red('Startup failed:'), error); process.exit(1); });
