import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";

const Categories = () => {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
      *[_type =="category"]
      `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);
  // console.log(Categories);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* CateogryCard */}
      {Categories.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={urlFor(category.image).width(200).url()}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
};
export default Categories;
