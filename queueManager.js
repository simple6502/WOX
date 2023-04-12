class QueueManager {
    constructor() {
      this.chatQueue = [];
      this.mediaQueue = [];
    }
  
    async addToQueue(queueName, commandFunction, message, args) {
      const queue = queueName === 'CHAT' ? this.chatQueue : this.mediaQueue;
      const commandPromise = new Promise((resolve) => {
        queue.push({ commandFunction, message, args, resolve });
      });
  
      if (queue.length === 1) {
        this.processQueue(queueName);
      }
  
      return commandPromise;
    }
  
    async processQueue(queueName) {
      const queue = queueName === 'CHAT' ? this.chatQueue : this.mediaQueue;
  
      if (queue.length === 0) return;
  
      const commandObj = queue[0];
      await this.executeCommand(commandObj);
      commandObj.resolve();
      queue.shift();
      this.processQueue(queueName);
    }
  
    async executeCommand({ commandFunction, message, args }) {
      try {
        await commandFunction(message, args);
      } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
      }
    }
  }
  
  module.exports = new QueueManager();
  