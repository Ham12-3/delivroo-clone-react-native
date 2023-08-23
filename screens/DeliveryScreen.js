import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  console.log(restaurant.long);
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50 pt-5">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order help</Text>
        </View>
        <View className="bg-white mx-5 rounded-md p-4 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-xl text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://png.pngtree.com/png-vector/20220327/ourmid/pngtree-big-isolated-motorcycle-vector-colorful-icons-set-flat-illustrations-of-various-png-image_4517043.png",
              }}
              className="h-20 w-20  bg-white"
              style={{}}
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-4"
        mapType="mutedStandard"
        style={{ flex: 1 }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_decription}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
          style={{}}
        />
        <View className="flex-1">
          <Text className="text-2xl text-bold">Sonaike Abdul</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
