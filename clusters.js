const cluster = require("cluster");;
const os = require("os");

const CPUS = os.cpus();

if (cluster.isMaster) {
    CPUS.forEach(function() { 
        cluster.fork()
    });

    cluster.on("listening", function(worker) {
        console.log("Cluster %d conectado", worker.process.pid);
    });

    cluster.on("disconnect", function(worker) {
        console.log("Cluster %d desconectado", worker.process.pid);
    });

    cluster.on("exit", function(worker) {
        console.log("Cluster %d saiu do ar", worker.process.pid);
        cluster.fork();
        // Garante que um novo cluster inicie se um antigo morrer
    });
} else {
    require("./index");
}