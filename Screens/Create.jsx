import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const Create = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [nameLocation, setNameLocation] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const toggleCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      // await MediaLibrary.createAssetAsync(uri);
      setPicture(uri);
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    }
  };
  const sandPhoto = async () => {
    // console.log(picture);
    if (!picture) return;
    const post = {
      picture,
      location,
      title,
      nameLocation,
    };
    navigation.navigate("Post", { post });
    setPicture(null);
    setTitle(null);
    setLocation(null);
    setNameLocation(null);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      let locationStatus = await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(locationStatus.status === "granted");
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.photoView}>
          {picture && (
            <ImageBackground
              source={{ uri: picture }}
              style={styles.pictureContainer}
            >
              <TouchableOpacity
                style={styles.delContainer}
                onPress={() => setPicture(null)}
              >
                <View style={styles.takePhotoOut}>
                  <Text style={styles.btnTitle}>X</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          )}

          <TouchableOpacity style={styles.flipContainer} onPress={takePicture}>
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipContainer} onPress={toggleCamera}>
            <View style={styles.takePhotoOut}>
              <Text style={styles.btnTitle}>Flip</Text>
            </View>
          </TouchableOpacity>
          {picture && (
            <>
              <View style={styles.flipContainer}>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={(value) => setTitle(value)}
                  placeholder="Title"
                />
              </View>
              <View style={styles.flipContainer}>
                <TextInput
                  style={styles.input}
                  value={nameLocation}
                  onChangeText={(value) => setNameLocation(value)}
                  placeholder="Location"
                />
              </View>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={sandPhoto}
              >
                <View style={styles.btnSand}>
                  <Text style={styles.btnTitle}>Sand</Text>
                </View>
              </TouchableOpacity>
              {/* <Text>{location.latitude}</Text> */}
              {/* <Text>{location.longitude}</Text> */}
            </>
          )}
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    // backgroundColor: "tomato",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "center",
  },
  delContainer: {
    flex: 0.1,
    alignItems: "flex-end",
  },
  pictureContainer: {
    flex: 0.5,
    width: 200,
    overflow: "hidden",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 60,
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  btnTitle: {
    fontSize: 18,
    color: "white",
  },
  btnSand: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 44,
  },
  input: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
});
