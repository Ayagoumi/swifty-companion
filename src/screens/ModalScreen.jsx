import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import BigCoalationView from "../components/BigCoalationView";
import SkillsComponent from "../components/SkillsComponent";
import Achievements from "../components/AchievementsComponent";
import Projects from "../components/ProjectsComponent";

export default function ModalScreen({ navigation, route }) {
  const data = route?.params?.userData;
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const bgStyle = data?.coalitions[selected]?.color
    ? data?.coalitions[selected]?.color
    : "#00babc";

  const DATA = [
    <BigCoalationView
      cover_url={data?.coalitions[0]?.cover_url}
      coalitions={data?.coalitions[0]}
      bgstyle={styles.bgstyle}
      data={data}
      setProjects={setProjects}
      setLoading={setLoading}
      selected={selected}
      setSelected={setSelected}
    />,
    <Projects loading={loading} projects={projects} bgStyle={bgStyle} />,
    <SkillsComponent
      skills={data?.cursus_users[selected]?.skills}
      bgStyle={bgStyle}
    />,
    <Achievements achievements={data?.achievements} bgStyle={bgStyle} />,
  ];
  const renderItem = ({ item }) => <View>{item}</View>;

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => DATA?.findIndex((i) => i === item)}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      maxToRenderPerBatch={5}
      removeClippedSubviews={false}
      updateCellsBatchingPeriod={100}
      initialNumToRender={5}
      initialScrollIndex={0}
      contentContainerStyle={{
        paddingBottom: 20,
        backgroundColor: "#FFFAF8",
      }}
    />
  );
}

const styles = StyleSheet.create({
  bgstyle: {
    minHeight: 110,
    overflow: "hidden",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
});
