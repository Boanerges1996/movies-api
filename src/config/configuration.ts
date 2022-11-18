export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  mongodb: process.env.MONGODB_URL,
  rabbitMq: process.env.RABBITMQ_URL,
  globalPrefix: 'api',
  throttle: {
    ttl: process.env.THROTTLER_TTL || 60,
    limit: process.env.THROTTLER_LIMIT || 10,
  },
});
