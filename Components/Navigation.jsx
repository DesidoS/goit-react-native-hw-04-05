import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";

import { Octicons } from "@expo/vector-icons";

import { Map } from "../Screens/MapScreen";
import { Comments } from "../Screens/CommentsScreen";
import { Register } from "../Screens/Register";
import { Login } from "../Screens/Login";
import { Home } from "./Home";

const MainStack = createNativeStackNavigator();

export const Navigation = () => {
  const useRoute = () => {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: "Login",
          }}
        />
        <MainStack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            title: "Register",
          }}
        />
        <MainStack.Screen
          name="MapScreen"
          component={Map}
          options={{
            title: "Map",
          }}
        />
        <MainStack.Screen
          name="Coments"
          component={Comments}
          options={{
            title: "Comments",
          }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerBackVisible: false,
            headerRight: () => (
              <Button title="⍈" onPress={() => alert("Log out")} />
            ),
          }}
        />
      </MainStack.Navigator>
    );
  };
  const routing = useRoute();
  return <NavigationContainer>{routing}</NavigationContainer>;
};
