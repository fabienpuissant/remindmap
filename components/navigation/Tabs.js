import React from 'react';
import Map from '../map/Map';
import MarkerList from '../markers/MarkerList'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();


export default function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Map"
            activeColor="white"
            labelStyle={{ fontSize: 12 }}
        >
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="map-marker" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Markers"
                component={MarkerList}
                options={{
                    tabBarLabel: 'Markers',
                    tabBarIcon: ({ color }) => (
                        <Feather name="list" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}