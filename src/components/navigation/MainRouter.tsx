import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import AppUpdate from '../../screen/AppUpdate/AppUpdate';
import HomeScreen from '../../screen/Home/HomeScreen';
import SearchScreen from '../../screen/Search/SearchScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../../config/colors';
const mainRouter = [
  {name: 'Search', component: SearchScreen},
  {name: 'Update', component: AppUpdate},
];

export const NavigationProvider: FC = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {mainRouter.map((router, index) => (
          <Drawer.Screen
            {...{
              ...router,
              key: index,
              options: {
                headerTitle: '',
                headerTransparent: true,
                header: ({navigation}) => {
                  return (
                    <Ionicons
                      name="menu"
                      size={26}
                      style={{marginLeft: 10, padding: 10}}
                      color={colours.secondaryGrey}
                      onPress={() => navigation.openDrawer()}
                    />
                  );
                },
              },
            }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
