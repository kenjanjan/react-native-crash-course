import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Tesseract from "tesseract.js";

export default function Map() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<Camera | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      // Process the image using Tesseract.js
      recognizeText(photo.uri);
    }
  };

  const recognizeText = async (imageUri: any) => {
    try {
      const result = await Tesseract.recognize(imageUri);
      const text = result.data.text;
      console.log(`Recognized text: ${text}`);
      // Do something with the recognized text, e.g., display it on the screen
    } catch (error) {
      console.error(`Error recognizing text: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer} className="z-10">
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
            className="z-10"
          >
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <View
        style={styles.camera}
        className="h-full w-full px-[10%] py-[10%] rounded-sm border-[#000000]  absolute z-5"
      >
        <View className="border-white border-[3px] rounded-lg h-full w-full !bg-transparent opacity-100 overflow-hidden"></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
