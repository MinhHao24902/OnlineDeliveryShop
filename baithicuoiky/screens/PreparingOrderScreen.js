import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 5000) //1000 = 1 giây
  }, [])

  return (
    <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
      <Animatable.Image
        source={require("../images/orderLoading2.gif")}
        animation="slideInUp"
        interactonCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        interactonCount={2}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Vui lòng đợi shop xác nhận đơn hàng!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color='white'/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen