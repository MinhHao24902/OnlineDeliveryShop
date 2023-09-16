import * as React from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, HelperText, ScrollView, Text } from 'react-native';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const handleLogin = () => {
    if (!email) {
      setIsEmailValid(false);
    }
    if (!password) {
      setIsPasswordValid(false);
    }
  };

  const handleRegister = () => {
    // Navigate to Register screen
  };

  return (
    <SafeAreaView className='flex'>
      <TextInput className='mt-12 mb-4 self-center w-64 border h-10 p-2' placeholder="Email" value={email} onChangeText={text => {
          setEmail(text);
          setIsEmailValid(true);
        }}
        error={!isEmailValid}
      />
      {!isEmailValid && (<HelperText type="error" visible={!isEmailValid}>Vui lòng nhập Email</HelperText>)}

      <TextInput className='self-center w-64 border h-10 p-2' style={{marginTop: 4}} placeholder="Mật Khẩu" value={password} onChangeText={text => {
          setPassword(text);
          setIsPasswordValid(true);
        }}
        error={!isPasswordValid}
        secureTextEntry
      />
      {!isPasswordValid && (<HelperText type="error" visible={!isPasswordValid}>Vui lòng nhập Mật Khẩu</HelperText>)}
      <TouchableOpacity className='mt-4 w-52 h-8 self-center bg-[#00CCBB]'>
        <Text className = 'font-bold text-gray-500 text-2xl text-center'>Đăng Nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity className='mt-4 w-52 h-8 self-center bg-[#00CCBB]'>
        <Text className = 'font-bold text-gray-500 text-2xl text-center'>Đăng Ký</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LoginForm;
