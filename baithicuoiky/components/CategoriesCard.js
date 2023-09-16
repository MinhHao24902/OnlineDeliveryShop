import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CategoriesCard = ({id, title, imgUrl}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() =>{
      navigation.navigate('CategoriesDishes', {
        id, title
      })
    }}>
      <Image source={{uri: imgUrl}}
      className = 'h-20 w-20 rounded ml-1'
      />
      <Text className='absolute bottom-1 left-2 text-white font-bold'>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoriesCard
