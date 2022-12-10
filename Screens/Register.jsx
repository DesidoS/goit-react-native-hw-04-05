import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";

const initialState = {
  user: "",
  email: "",
  password: "",
};

export const Register = ({ navigation, route }) => {
  const [state, setState] = React.useState(initialState);

  const userlHandler = (value) =>
    setState((prevState) => ({ ...prevState, user: value }));
  const emailHandler = (value) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const passwordHandler = (value) =>
    setState((prevState) => ({ ...prevState, password: value }));

  const onRegister = () => {
    Keyboard.dismiss();
    Alert.alert(
      "Credentials",
      `${state.user} - ${state.email} - ${state.password} `
    );
    navigation.navigate("Home", {
      screen: "Post",
      params: { state },
    });
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.form}>
            <View style={styles}>
              <TextInput
                value={state.user}
                onChangeText={(value) => userlHandler(value)}
                placeholder="Username"
                style={styles.input}
              />
            </View>
            <View style={styles}>
              <TextInput
                value={state.email}
                onChangeText={(value) => emailHandler(value)}
                placeholder="Email"
                style={styles.input}
              />
            </View>
            <View style={styles}>
              <TextInput
                value={state.password}
                onChangeText={(value) => passwordHandler(value)}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={onRegister}
            >
              <Text style={styles.btnTitle}>Register</Text>
            </TouchableOpacity>
            <View style={styles.registerLink}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerLink: {
    marginTop: 10,
    alignItems: "center",
  },
  form: {
    marginHorizontal: 40,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 10,
  },
  btn: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 44,
  },
});
