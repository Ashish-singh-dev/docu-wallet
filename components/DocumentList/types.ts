import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList, RootTabParamList } from "../../types";
import { Theme } from "../Card/types";

export type DocumentListProps = {
  theme: Theme;
  documents: any;
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<RootTabParamList, "Cards", undefined>,
    NativeStackNavigationProp<
      RootStackParamList,
      keyof RootStackParamList,
      undefined
    >
  >;
};
