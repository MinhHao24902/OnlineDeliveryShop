import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native'
import ShopCard from './ShopCard'
import sanityClient from '../sanity'

const FeaturedRow = ({id, title, description}) => {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured" && _id == $id] {
            ...,
            shops[] ->{
              ...,
              dishes[] ->,
              type -> {
                name
              }
            },
          }[0]   
          `,
          { id }
        )
        .then((data) => {
            setShops(data?.shops);
        });
    }, []);

  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00CCBB"/>
        </View>

        <Text className="text-xs text-gray-500 px-4">{description}</Text>

        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >
        {shops?.map(shop => (
            <ShopCard 
                key={shop._id}
                id={shop._id}
                imgUrl={shop.image}
                address={shop.address}
                title={shop.name}
                dishes={shop.dishes}
                rating={shop.rating}
                short_description={shop.short_description}
                genre={shop.type?.name}
                long={shop.long}
                lat={shop.lat}
            />
        ))}
        </ScrollView>
    </View>
  )
}

export default FeaturedRow;