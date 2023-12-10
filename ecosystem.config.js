module.exports = {
  apps: [
    {
      name: 'apiDelmoo',
      script: 'var/www/apiDelmoo/index.js',
      watch: true,
      ignore_watch: ['logs'],
      instances: 1,
      autorestart: true,
      exec_mode: 'fork',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: 'logs/out.log',
      error_file: 'logs/error.log',
    },
  ],
};
