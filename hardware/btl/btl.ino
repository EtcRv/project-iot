#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>
// WiFi
const char *ssid = "iPhone"; // Enter your Wi-Fi name
const char *password = "dungpi123";  // Enter Wi-Fi password

const char* ca_cert= \
"-----BEGIN CERTIFICATE-----\n" \
"MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\n" \
"MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\n" \
"d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\n" \
"QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\n" \
"MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\n" \
"b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n" \
"9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\n" \
"CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\n" \
"nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n" \
"43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\n" \
"T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\n" \
"gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\n" \
"BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\n" \
"TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\n" \
"DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\n" \
"hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n" \
"06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\n" \
"PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\n" \
"YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\n" \
"CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=" \
"-----END CERTIFICATE-----\n";

const int device_id = 1234123;

// MQTT Broker
// const char *mqtt_broker = "broker.emqx.io";
const char *mqtt_broker = "a171e37b.ala.us-east-1.emqxsl.com";
const char *topic = "hust/iot/data";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
// const int mqtt_port = 1883;
const int mqtt_port = 8883;
const int LED = 32;
const int BUZZ = 33;
const int SENSOR_INPUT = 34;
String esp32_address;

// Các ngưỡng
const int THRESHOLD_NO_GAS = 1800;
const int THRESHOLD_LEAK_HIGH = 5000;

// WiFiClient espClient;
WiFiClientSecure espClient;
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
      digitalWrite(BUZZ, HIGH);
      publishMessage("Normal", sensor_value, false, isTest);
      delay(3000);
    } else if (sensor_value >= THRESHOLD_NO_GAS && sensor_value < THRESHOLD_LEAK_HIGH) {
      Serial.println("Gas detect");
      publishMessage("Gas detect", sensor_value, false, isTest);
      for (int i = 0; i< 3; i++) {
        digitalWrite(LED, HIGH);
        digitalWrite(BUZZ, LOW);
        delay(1500);
        digitalWrite(LED, LOW);
        digitalWrite(BUZZ, HIGH);
        delay(1500);
      }
    } else if (sensor_value >= THRESHOLD_LEAK_HIGH) {
      Serial.println("Dangerous");
      publishMessage("Dangerous", sensor_value, false, isTest);
      for (int i = 0; i< 10; i++) {
        digitalWrite(LED, HIGH);
        digitalWrite(BUZZ, LOW);
        delay(500);
        digitalWrite(BUZZ, HIGH);
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
    for (int i = 0; i< 3; i++) {
      digitalWrite(LED, HIGH);
      digitalWrite(BUZZ, HIGH);
      delay(1500);
      digitalWrite(LED, LOW);
      digitalWrite(BUZZ, LOW);
      delay(1500);
    }
  } else if (message.equals("\"Check Leak High\"")) {
    Serial.println("Received message check leak high!");
    Serial.println("Dangerous");
    publishMessage("Dangerous", THRESHOLD_LEAK_HIGH, false, true);
    for (int i = 0; i< 10; i++) {
      digitalWrite(LED, HIGH);
      digitalWrite(BUZZ, HIGH);
      delay(500);
      digitalWrite(BUZZ, LOW);
      digitalWrite(LED, LOW);
      delay(500);
    }
  }
}

void callback(char *topic, byte *payload, unsigned int length) {
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
    pinMode(BUZZ, OUTPUT);

    // Set up MQTT callback and server
    espClient.setCACert(ca_cert);
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);
    while (!client.connected()) {
        if (client.connect("esp32-client-test", mqtt_username, mqtt_password)) {
            Serial.println("Public emqx mqtt broker connected");
        } else {
            Serial.print("Failed to connect to MQTT broker, rc=");
            Serial.print(client.state());
            Serial.println("Retrying in 5 seconds.");
            delay(5000);
        }
    }

    // Attempt to connect to MQTT
    // reconnect();
    // client.publish(topic, "Hi EMQX I'm ESP32 ^^"); // publish to the topic
}

void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();
    int sensor_Aout = analogRead(SENSOR_INPUT);
    // Serial.print("Gas Sensor: ");
    Serial.println(sensor_Aout);
    handleSensor(sensor_Aout);
    
}