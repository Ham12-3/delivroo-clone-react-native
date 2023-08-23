import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured" && _id ==$id] {
        ...,
        restaurants[]-> {
            ...,
            dishes[]-> ,
            type-> {
                name
            }
        } ,
    } [0]
    
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);
  //   console.log(restaurants);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-400 px-4 pb-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          padding: 10,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          );
        })}
        {/* restaurantcards */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
