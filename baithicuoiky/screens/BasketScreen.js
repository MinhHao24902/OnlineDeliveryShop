import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../features/shopSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';

const BasketScreen = () => {
  const navigation = useNavigation();
  const shop = useSelector(selectShop);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
        return results
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Giỏ hàng</Text>
            <Text className='text-center text-gray-400'>{shop.title}</Text>
          </View>
          <TouchableOpacity 
          onPress={navigation.goBack}
          className='rounded-full bg-gray-100 absolute top-3 right-5 mt-3'>
            <XCircleIcon color="#00CCBB" height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image 
            source={require('.././images/logo.png')}
            className = 'h-7 w-7 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1'>Giao hàng ngay từ 30-60 phút</Text>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text className='text-[#00CCBB]'>Thay đổi</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
              <Text className='text-[#00CCBB]'>{items.length} x</Text>
              <Image 
                source={{uri: urlFor(items[0]?.image).url()}}
                className='h-12 w-12 rounded-full'
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-600'>{items[0]?.price}.VND</Text>
              <TouchableOpacity>
                <Text 
                  className='text-[#00CCBB] text-xs'
                  onPress= {() => dispatch(removeFromBasket({id: key}))}
                >
                  Bỏ chọn
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Tổng tiền món ăn</Text>
            <Text className='text-gray-400'>
              {basketTotal}.VND
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Phí ship</Text>
            <Text className='text-gray-400'>
              15000.VND
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Tổng số tiền phải trả</Text>
            <Text className='font-extrabold'>
              {basketTotal + 15000}.VND
            </Text>
          </View>
          <TouchableOpacity 
          onPress={() => navigation.navigate('PreparingOrderScreen')}
          className='rounded-lg bg-[#00CCBB] p-4'>
            <Text className='text-center text-white text-lg font-bold'>Đặt món</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen