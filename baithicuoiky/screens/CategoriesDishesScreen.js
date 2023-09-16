import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import sanityClient from '../sanity'
import { urlFor } from '../sanity';
import { ArrowLeftIcon, MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { selectBasketItems, addToBasket, selectBasketItemsWithId, removeFromBasket } from '../features/basketSlice';

const CategoriesDishesScreen = () => {
  const {params: {
    title,
  }} = useRoute();

  const navigation = useNavigation();
  const [dishes, setDishes] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "shop" && type->name match $title] {
        ...,
        dishes[]->{...},
          type->{...},
      }
        `,
        {title}
    )
    .then((data) => {
       const allDishes = data.map(item => item.dishes).flat().map(dish => {
        return {
          ...dish,
        }
      }); //Dùng flat để tạo ra một mảng duy nhất chứa toàn bộ các phần tử dishes của danh sách kết quả truy vấn
       setDishes(allDishes);
    });
  }, []);

  const price = dishes.map(dish => dish.price);
  const id = dishes.map(dish => dish._id);

  const items = useSelector((state) => selectBasketItemsWithId(state, id))

  const addItemToBasket = () => {
    dispatch(addToBasket({id, title, price}))
  }

  const removeItemFromBasket = () => {
    if(!items.length > 0) return;
    dispatch(removeFromBasket({id}))
  }

  console.log(price)
  console.log(id)
  console.log(title)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  },[])

  return (
    <ScrollView 
    className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
      <Image
            source={{uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/07/hinh-ve-don-gian-va-de-thuong-nhat.jpg'}}
            className = 'w-full h-56 bg-gray-300 p-4 mb-3 mt-3'
        />
      <TouchableOpacity 
        onPress={navigation.goBack}
        className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
            <ArrowLeftIcon height={20} color='#00CCBB'/>
      </TouchableOpacity>
      {dishes?.map(item => (
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
        <View className='flex-row border p-4 rounded m-2'>
        <View className='flex-1 or-2' key = {item.id}>
          <Text className='text-lg mb-1'>{item.name}</Text>
          <Text className='text-gray-400 mt-2'>{item.price}.VND</Text>
        </View>
        <View>
          <Image 
              style={{borderWidth:1, borderColor:"#F3F3F4"}}
              source={{uri: urlFor(item.image).url()}}
              className='h-20 w-20 bg-gray-300 p-4'
          />
        </View>
        </View>
        {isPressed && (
        <View className='bg-white px-4 mt-3'>
            <View className='flex-row items-center space-x-2 pb-3'>
                <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                    <MinusCircleIcon
                        color={items.length > 0 ? "#00CCBB" : "gray"}
                        size={40}
                    />
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon
                        color="#00CCBB"
                        size={40}
                    />
                </TouchableOpacity>
            </View>
        </View>
        )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default CategoriesDishesScreen