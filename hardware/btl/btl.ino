#include <WiFi.h>
#include <PubSubClient.h>

// WiFi
const char *ssid = "kira"; // Enter your Wi-Fi name
const char *password = "matkhauwifi";  // Enter Wi-Fi password

const int device_id = 1234123;

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "hust/iot/data";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;
const int LED = 32;
const int SENSOR_INPUT = 34;
String esp32_address;

// Các ngưỡng
const int THRESHOLD_NO_GAS = 1800;
const int THRESHOLD_LEAK_HIGH = 5000;

WiFiClient espClient;
PubSubClient client(espClient);

void publishMessage(char *message,int sensorValue = 0, bool isCheckDevice = false, bool isTest = false) {
  String jsonMessage;
  
  if(isCheckDevice) {
    jsonMessage = "{\"devideId\":\"" + String(esp32_address) + "\",\"status\":\"Alive\"}";
  } else {
    if(isTest) {
      jsonMessage = "{\"devideId\":\"" + String(esp32_address) + "\",\"message\":\"" + message + "\",\"test\":\"true\",\"value\":\"" + sensorValue + "\"}";
    } else {
      jsonMessage = "{\"devideId\":\"" + String(esp32_address) + "\",\"message\":\"" + message + "\",\"value\":\"" + sensorValue + "\"}";
    }
    
  }
  client.publish(topic, jsonMessage.c_str());
}

void handleSensor(int sensor_value, bool isTest = false) {
  if(sensor_value < THRESHOLD_NO_GAS) {
      // Serial.println("No Gas");
      digitalWrite(LED, LOW);
      publishMessage("Normal", sensor_value, false, isTest);
      delay(3000);
    } else if (sensor_value >= THRESHOLD_NO_GAS && sensor_value < THRESHOLD_LEAK_HIGH) {
      Serial.println("Gas detect");
      publishMessage("Gas detect", sensor_value, false, isTest);
      for (int i = 0; i< 5; i++) {
        digitalWrite(LED, HIGH);
        delay(1500);
        digitalWrite(LED, LOW);
        delay(1500);
      }
    } else if (sensor_value >= THRESHOLD_LEAK_HIGH) {
      Serial.println("Dangerous");
      publishMessage("Dangerous", sensor_value, false, isTest);
      for (int i = 0; i< 10; i++) {
        digitalWrite(LED, HIGH);
        delay(500);
        digitalWrite(LED, LOW);
        delay(500);
      }
    }
}

void handleReceiveMessage(String message) {
  if(message.equals("\"Check Alive\"")) {
    Serial.println("Received message check alive!");
    publishMessage("",0 ,true);
  } else if (message.equals("\"Check Leak\"")) {
    Serial.println("Received message check leak!");
    Serial.println("Gas detect");
    publishMessage("Gas detect", THRESHOLD_NO_GAS, false, true);
    for (int i = 0; i< 5; i++) {
      digitalWrite(LED, HIGH);
      delay(1500);
      digitalWrite(LED, LOW);
      delay(1500);
    }
  } else if (message.equals("\"Check Leak High\"")) {
    Serial.println("Received message check leak high!");
    Serial.println("Dangerous");
    publishMessage("Dangerous", THRESHOLD_LEAK_HIGH, false, true);
    for (int i = 0; i< 10; i++) {
      digitalWrite(LED, HIGH);
      delay(500);
      digitalWrite(LED, LOW);
      delay(500);
    }
  }
}

void callback(char *topic, byte *payload, unsigned int length) {
    Serial.println();
    String message = "";
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    handleReceiveMessage(message);
    Serial.println();
}

void reconnect() {
    // Loop until we're reconnected
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...");
        // Attempt to connect
        if (client.connect("esp32-client-test", mqtt_username, mqtt_password)) {
            Serial.println("connected");
            // Once connected, publish an announcement...
            publishMessage("", 0, true);
            // ...and resubscribe
            client.subscribe(topic);
        } else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            // Wait 5 seconds before retrying
            delay(5000);
        }
    }
}

void setup() {
    Serial.begin(115200);
    // Connecting to a WiFi network
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the Wi-Fi network");
    esp32_address = WiFi.macAddress();
    pinMode(LED, OUTPUT);

    // Set up MQTT callback and server
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);

    // Attempt to connect to MQTT
    reconnect();
}

void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();
    int sensor_Aout = analogRead(SENSOR_INPUT);
    // Serial.print("Gas Sensor: ");
    // Serial.println(sensor_Aout);
    handleSensor(sensor_Aout);
    
}