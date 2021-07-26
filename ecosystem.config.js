

module.exports = {
  apps: [
    {
      name: "Thehina",
      script: "server.js",
      watch: ["public/uploads"],
    // Delay between restart
    watch_delay: 1000,
    ignore_watch : ["node_modules", "client/img"],
    watch_options: {
      "followSymlinks": false
    },
      instances: 5,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
     }],
};
