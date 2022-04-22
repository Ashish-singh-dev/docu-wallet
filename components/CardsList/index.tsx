import { FlatList, ListRenderItemInfo, View } from "react-native";
import React from "react";

import { Caption } from "react-native-paper";

import Card from "../Card";
import { data } from "../../utils/data";
import { CardsListProps } from "./types";
import { CardDetails } from "../../types";
import { isSmallDevice } from "../../constants/Layout";
import { styles } from "./styles";

const CardsList = ({ theme }: CardsListProps) => {
  const RenderItem = ({ item }: ListRenderItemInfo<CardDetails>) => {
    return <Card theme={theme} item={item} />;
  };

  function EmptyComponent() {
    return (
      <View style={styles.emptyComponent}>
        {/* @ts-ignore */}
        <Caption
          style={{
            fontSize: isSmallDevice ? 14 : 16,
            color: theme.secondaryText,
          }}
        >
          No card to show, add one to see here!
        </Caption>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(data) => data.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: "100%",
          paddingHorizontal: 15,
          flex: 1,
          backgroundColor: theme.background,
        }}
        contentContainerStyle={{
          paddingBottom: 72,
        }}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
};

export default React.memo(CardsList);
