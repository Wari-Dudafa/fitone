import { useEffect } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import { useTheme } from "react-native-paper";

function Card(props) {
  const theme = useTheme();
  const fadeInValue = new Animated.Value(0);
  const cardOpacity = fadeInValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fadeIn = () => {
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const stayIn = () => {
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (props.fade) {
      fadeIn();
    } else {
      stayIn();
    }
  }, []);

  return (
    <View
      style={[styles.mainCard, { backgroundColor: theme.colors.primary }]}
      shouldRasterizeIOS={true}
    >
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")} // Blinking, acceptable performance
        defaultSource={require("../../assets/shading-1.png")} // No blinking, terrible performance
      />

      <View style={styles.border}>
        <Animated.Text style={[styles.name, { opacity: cardOpacity }]}>
          {props.name}
        </Animated.Text>
        <View style={styles.underline} />

        <Animated.View style={{ opacity: cardOpacity }}>
          {/* Github style contribution graph */}
        </Animated.View>
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: 280,
    height: "100%",
    resizeMode: "stretch",
    opacity: 0.05,
    zIndex: -1,
  },
  border: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 5,
    alignContent: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: 900,
    color: "#e6e6e6",
  },
  underline: {
    width: "90%",
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 5,
    backgroundColor: "#e6e6e6",
  },
  mainCard: {
    position: "absolute",
    top: 70,
    height: 450,
    width: 280,
    borderRadius: 10,
    zIndex: 1,
  },
  itemContainer: {
    flex: 1,
    paddingBottom: 10,
  },
});
