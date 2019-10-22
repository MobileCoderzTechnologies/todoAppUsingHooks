import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Theme from '../../Config/Theme';
import FirebaseHandler from '../../Utilities/FirebaseHandler';

function useLoginScreen({ navigation }) {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const updateUser = (keyName, value) => {
    const tempUser = { ...user, [keyName]: value };
    setUser(tempUser);
  };

  const loginHandle = async () => {
    try {
      const responseData = await FirebaseHandler.getInstance()
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      console.log('Response data', responseData);
      navigation.navigate('home');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const styles = StyleSheet.create({
    bodyStyle: {
      padding: 15
    },
    containerStyle: {
      backgroundColor: Theme.dark,
      paddingVertical: 15
    },
    headingStyle: {
      fontSize: 40,
      textAlign: 'center',
      color: Theme.white
    },
    buttonStyle: {
      backgroundColor: Theme.primary,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonTextStyle: {
      color: Theme.white,
      fontSize: 24
    }
  });

  return {
    user,
    updateUser,
    styles,
    loginHandle
  };
}

export default useLoginScreen;
