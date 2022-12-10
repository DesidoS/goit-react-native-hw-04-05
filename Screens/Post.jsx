import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

export const Post = ({ route, navigation }) => {
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    if (!route.params) return;
    if (route.params.state) {
      setUser((prevState) => [...prevState, route.params.state]);
    }
    if (route.params.post === 0) return;
    if (route.params.post) {
      setPosts((prevState) => [...prevState, route.params.post]);
    }
  }, [route.params]);

  if (posts.length === 0)
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
      </View>
    );

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={{ uri: item.picture }}
              style={{ height: 400, width: "90%", borderRadius: 20 }}
            />
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.con}>
              <View>
                <TouchableOpacity
                  style={styles.cont}
                  onPress={() => navigation.navigate("Coments")}
                >
                  <Octicons name="feed-discussion" size={24} color="black" />
                  <Text style={{ margin: 10 }}>Comments</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cont}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      latitude: item.location.latitude,
                      longitude: item.location.longitude,
                    })
                  }
                >
                  <Text style={{ margin: 10 }}>{item.nameLocation}</Text>
                  <Octicons name="location" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  con: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  cont: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    flex: 1,
    justifyContent: "start",
    width: "80%",
    margin: 10,
    fontSize: 24,
  },
});

//  <Text>{item.location.latitude}</Text>
// <Text>{item.location.longitude}</Text>
