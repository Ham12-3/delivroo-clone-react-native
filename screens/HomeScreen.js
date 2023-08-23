import React, { useLayoutEffect, useState, useEffect } from "react";

import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";

import { View, Text, Image, TextInput, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [featuredCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
      *[_type == "featured"] {
        ...,
        restaurants[] -> {
          ...,
          dishes[]->
        }
      }
      `
      )
      .then((data) => {
        // console.log(data);
        setFeaturedCategories(data);
      });
  }, []);
  // console.log(featuredCategories);
  // const featured = JSON.stringify(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5 pb-14">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurant and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>
      <View className="pb-36">
        <ScrollView className="bg-gray-100">
          {/* Categories */}
          <Categories />
          {/* Featured rows */}
          {/* featuredCategories */}
          {featuredCategories?.map((category) => {
            return (
              <View>
                <FeaturedRow
                  key={category._id}
                  title={category.name}
                  id={category._id}
                  description={category.short_description}
                />
              </View>
            );
          })}

          {/* <FeaturedRow
          title="Featured"
          id="123"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
        <FeaturedRow
          title="Tasty discounts"
          id="123"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
        <FeaturedRow
          title="Featured"
          id="123"
          description="Paid placements from our partners"
          featuredCategory="featured"
        /> */}
          {/* <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/01/28/17/43/fish-2016013_1280.jpg",
          }}
          className="h-20 w-20 rounded "
        /> */}
        </ScrollView>
      </View>

      {/* <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/01/28/17/43/fish-2016013_1280.jpg",
        }}
        className="h-20 w-20 rounded "
      /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
