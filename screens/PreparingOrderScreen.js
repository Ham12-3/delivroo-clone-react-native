import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  });
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/splashPurchase.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="pt-20 h-56 w-56"
        style={{}}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your orders
      </Animatable.Text>
      <Progress.Pie
        size={60}
        indeterminate={true}
        fill="#00CCBB"
        color="white"
        className="color-white"
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
