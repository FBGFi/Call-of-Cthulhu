module.exports = {
    apps: [
      {
        name: "Call of Cthulhu server",
        script: 'dist/server.js',
        error_file: `${__dirname}/logs/server_err.log`,
        out_file: `${__dirname}/logs/server_out.log`,
        log_file: `${__dirname}/logs/server_combined.log`,
        watch: true,
        env: {
          NODE_ENV: "production"
        }
      }
    ],
  
    deploy: {
      production: {
        PROTOCOL: "http",
        HOST: "localhost",
        PORT: 3001,        
        'pre-deploy-local': '',
        'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };
  