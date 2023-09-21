import { useEffect } from "react";
import { SafeAreaView, Text, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
} from "react-native-reanimated";

import Button from "../../components/Button";
import TypeWriter from "../../components/TypeWriter";

function BulkingOrCuttingPage(props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const message = "What are your weight plans?";
  const fadingValue = useSharedValue(0);
  const widthValue = useSharedValue(screenWidth * 1.1);
  const heightValue = useSharedValue(screenHeight * 1.1);
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    fadeInStart();
    movementAnimation();
  }, []);

  const fadeInStart = () => {
    let timeout = 1500;
    setTimeout(() => {
      fadingValue.value = withTiming(1, { duration: timeout / 2 });
    }, timeout);
  };

  const movementAnimation = () => {
    let duration = 10000;

    imageOpacity.value = withTiming(0.05, { duration: 2000 });

    widthValue.value = withRepeat(
      withTiming(3.5 * screenWidth, {
        duration: duration,
      }),
      0,
      true
    );
    heightValue.value = withRepeat(
      withTiming(2 * screenHeight, {
        duration: duration,
      }),
      0,
      true
    );
  };

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: fadingValue.value,
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.primary,
      }}
    >
      <Animated.Image
        style={{
          position: "absolute",
          width: widthValue,
          height: heightValue,
          resizeMode: "stretch",
          opacity: imageOpacity,
          zIndex: -1,
        }}
        source={require("../../../assets/shading-1.png")}
        defaultSource={require("../../../assets/shading-1.png")}
        blurRadius={5}
      />

      <TypeWriter
        text={message}
        interval={200}
        delay={500}
        textStyle={{
          fontSize: 40,
          fontWeight: "bold",
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
          color: theme.colors.onPrimary,
        }}
      />

      <Animated.View style={fadeIn}>
        <Button
          title="Heavy cut"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 1,
            });
          }}
        />
        <Button
          title="Light cut"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 2,
            });
          }}
        />
        <Button
          title="Maintain"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 3,
            });
          }}
        />
        <Button
          title="Light bulk"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 4,
            });
          }}
        />
        <Button
          title="Heavy bulk"
          onPress={() => {
            props.navigation.navigate("SetCurrentBodySpecsPage", {
              value: 5,
            });
          }}
        />

        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            textAlign: "center",
            color: theme.colors.onPrimary,
          }}
        >
          Dont worry, this can be changed later in settings{" "}
        </Text>

        <Button
          title="Back"
          onPress={() => {
            props.navigation.pop();
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

export default BulkingOrCuttingPage;
