import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AdjustmentsHorizontalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon} from "react-native-heroicons/outline"
import Categories from '../components/Categories'
import sanityClient from '../sanity'
import FeaturedRow from '../components/FeaturedRow'

const HomeScreen = () => {
    const navigation = useNavigation();

    const [featuredCategories, setfeaturedCategories] = useState([]);
    
    useLayoutEffect(() => {
    navigation.setOptions({
         headerShown: false,
        });
    }, []);

    useEffect(() =>{
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            shops[] ->{
              ...,
              dishes[] ->
            },
          }`).then(data=>{
            setfeaturedCategories(data);
          })
    }, [])

  return (
    <SafeAreaView className = 'my-4 bg-white pt-5'>
         <View className='flex-row pb-3 items-center mx-4 space-x-2'>
            <Image 
                source={require('.././images/logo.png')}
                className = 'h-7 w-7 bg-gray-300 p-4 rounded-full'
            />

            <View className = 'flex-1'>
                <Text className = 'font-bold text-gray-400 text-xs'>
                    Giao Hàng Ngay!
                </Text>
                <Text className = 'font-bold text-xl'>
                        Địa điểm hiện tại
                    <ChevronDownIcon size={20} color="#00CCBB"/>
                </Text>
            </View>
            
            <UserIcon onPress= {() => navigation.navigate("Login")}  size={35} color="#00CCBB"/>
         </View>
         <View className='flex-row items-center space-x-2 pb-2 mx-4'>
            <View className='flex-row space-x-2 flex-1 bg-gray-200 p-2'>
                <MagnifyingGlassIcon size={20} color="gray"/>
                <TextInput placeholder='Tìm kiếm món ăn' keyboardType='default'/>
            </View>
         </View>
         <ScrollView className='bg-gray-100' contentContainerStyle ={{
            paddingBottom: 100,
         }}>
         <Categories/>
         {featuredCategories?.map(category => (
            <FeaturedRow 
              key = {category._id}
              id = {category._id}
              title = {category.name}
              description={category.short_description}
            />
         ))}
         </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
