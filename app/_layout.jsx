import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />

        <Toast />
      </>
    </Provider>
  );
}