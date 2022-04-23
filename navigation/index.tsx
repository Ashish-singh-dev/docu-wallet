import * as React from "react";

import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as NavigationBar from "expo-navigation-bar";

import Cards from "../screens/Cards";
import Notes from "../screens/Notes";
import AddNote from "../screens/AddNote";
import AddCard from "../screens/AddCard";
import Colors from "../constants/Colors";
import useTheme from "../hooks/useTheme";
import AppBar from "../components/AppBar";
import Documents from "../screens/Documents";
import NavHeader from "../components/NavHeader";
import ModalScreen from "../screens/ModalScreen";
import AddDocument from "../screens/AddDocument";
import NotFoundScreen from "../screens/NotFoundScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, RootTabParamList } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getIsDark } from "../redux/features/appTheme/appThemeSlice";
import { NativeColorScheme } from "../redux/features/appTheme/types";
import { StatusBar } from "expo-status-bar";

export default function Navigation({
  ColorScheme,
}: {
  ColorScheme: NativeColorScheme;
}) {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.dark.background,
    },
  };

  React.useEffect(() => {
    dispatch(getIsDark(ColorScheme));
  }, []);

  React.useEffect(() => {
    if (isDarkMode) {
      Promise.all([
        NavigationBar.setBackgroundColorAsync("black"),
        NavigationBar.setButtonStyleAsync("light"),
      ]).catch(() => {});
    } else {
      Promise.all([
        NavigationBar.setBackgroundColorAsync("white"),
        NavigationBar.setButtonStyleAsync("dark"),
      ]).catch(() => {});
    }
  }, [isDarkMode]);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={isDarkMode ? darkTheme : DefaultTheme}
    >
      <RootNavigator />
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={isDarkMode ? "#333333" : "#F2EFEA"}
      />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    // @ts-ignore
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TopTabNavigator}
        options={{
          headerShown: true,
          header: (props) => <AppBar {...props} />,
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          headerShown: true,
          header: (props) => <NavHeader title="Add Card" headerProps={props} />,
        }}
      />
      <Stack.Screen
        name="AddDocument"
        component={AddDocument}
        options={{
          headerShown: true,
          header: (props) => (
            <NavHeader title="Add Document" headerProps={props} />
          ),
        }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{
          headerShown: true,
          header: (props) => (
            <NavHeader title="Add Note" headerProps={props} back />
          ),
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!", headerShown: false }}
      />
      {/* @ts-ignore */}
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

function TopTabNavigator() {
  const theme = useTheme();

  return (
    // @ts-ignore
    <Tab.Navigator
      initialRouteName="Cards"
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarShowIcon: false,
        tabBarStyle: {
          backgroundColor: theme.primary,
        },
        tabBarInactiveTintColor: theme.text,
        tabBarIndicatorStyle: {
          backgroundColor: theme.tint,
        },
      }}
    >
      <Tab.Screen
        name="Cards"
        component={Cards}
        options={() => ({
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="id-card" color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Documents"
        component={Documents}
        options={{
          title: "Documents",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pencil-square-o" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  // @ts-ignore
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
