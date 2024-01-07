module.exports = {
  PORT: process.env.PORT || 8001,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  MQTT_HOST: process.env.MQTT_HOST,
  MQTT_PORT: process.env.MQTT_PORT,
  MQTT_TOPIC: process.env.MQTT_TOPIC,
};
