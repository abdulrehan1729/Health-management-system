const { Queue, Worker } = require("bullmq");

const connection = { host: "127.0.0.1", port: 6379 }

const createQueue = (name) => new Queue(name, { connection })

const createWorker = (name, processor) => {
    const worker = new Worker(name, processor, { connection });

    worker.on("completed", (job) => {
        console.log(`✅ Job completed:`, job.id);
    });

    worker.on("failed", (job, err) => {
        console.error(`❌ Job failed:`, job.id, err);
    });

    console.log(`🚀 Worker started for queue: ${name}`);
    return worker;
};

module.exports = { createQueue, createWorker }