import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FC} from 'react';
import AppUpdate from '../../screen/AppUpdate/AppUpdate';
import DetailsScreen from '../../screen/Lyrics/DetailsScreen';
import SearchScreen from '../../screen/Search/SearchScreen';
import Program from '../../screen/Program/Program';

const searchRoute = [
  {
    name: 'SearchScreen',
    component: SearchScreen,
  },
  {
    name: 'Details',
    component: DetailsScreen,
  },
];

const SearchNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {searchRoute.map((router, index) => (
        <Stack.Screen
          {...{
            ...router,
            key: index,
            options: {
              headerTitle: '',
              headerTransparent: true,
              header: () => null,
            },
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

const mainRouter = [
  {
    name: 'Search',
    component: SearchNavigator,
  },
  {
    name: 'Update',
    component: AppUpdate,
  },
  {
    name: 'Program',
    component: Program,
  },
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
                header: () => null,
              },
            }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
