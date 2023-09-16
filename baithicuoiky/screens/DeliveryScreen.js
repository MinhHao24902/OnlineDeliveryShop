import { View, Text, SafeAreaView,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectShop } from '../features/shopSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const shop = useSelector(selectShop);

  return (
    <View className='bg-[#00CCBB] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='mt-5 flex-row justify-between items-center p-3'>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <XCircleIcon color='white' size={30}/>
            </TouchableOpacity>
            <Text className='font-light text-white text-lg'>Trợ giúp(?)</Text>
        </View>
        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
            <View className='flex-row justify-between'>
                <View>
                    <Text className='text-lg text-gray-400'>Thời gian giao hàng ước tính</Text>
                    <Text className='text-4xl font-bold'>45-60 phút</Text>
                </View>
                <Image
                    source={require("../images/deliveryMan.png")}
                    className='h-20 w-20'
                />
            </View>
            <Progress.Bar size={30} color="#00CCBB" indeterminate={true}/>
            <Text className='mt-3 text-gray-500'>Đơn hàng bạn đặt tại shop {shop.title} đang được chuyển đến</Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
            latitude: shop.lat,
            longitude: shop.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        className='flex-1 -mt-10 z-0'
        mapType='mutedStandard'
      >
        <Marker
          coordinate={{
            latitude: shop.lat,
            longitude: shop.long,
          }}
          title={shop.title}
          description={shop.description}
          identifier='origin'
          pinColor='#00CCBB'
        />
      </MapView>
        <SafeAreaView className='bg-white flex-row items-center space-x-5 h-20'>
          <Image 
            source={require('.././images/logo.png')}
            className = 'h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
          />
          <View className='flex-1'>
            <Text className='text-lg'>Mrs. Hương</Text>
            <Text className='text-gray-400'>Shipper của bạn</Text>
          </View>
          <Text className='text-[#00CCBB] text-lg mr-5 font-bold'>Gọi ngay</Text>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen