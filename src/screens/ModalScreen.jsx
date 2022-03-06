import { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import BigCoalationView from "../components/BigCoalationView";
import { SvgCssUri } from "react-native-svg";

export default function ModalScreen({ navigation, route }) {
  const data = route?.params?.userData;
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
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
    <Projects loading={loading} projects={projects} />,
    <SkillsComponent skills={data?.cursus_users[selected]?.skills} />,
    <Achievements achievements={data?.achievements} />,
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

function Projects({ loading, projects }) {
  return (
    <>
      {projects && projects?.length > 0 && (
        <View>
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Projects
            </Text>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            {loading &&
              projects?.map((project) => (
                <View
                  key={project?.project?.id}
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "rgba(32,32,38,0.60)",
                    borderRadius: 12,
                    padding: 12,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{ fontSize: 22, fontWeight: "bold", color: "white" }}
                  >
                    {project.project.name?.length <= 20
                      ? project.project.name
                      : `${project.project.name.substring(0, 20)}...`}
                  </Text>
                  <View>
                    {project.status === "finished" ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: project["validated?"] ? "#00babc" : "red",
                        }}
                      >
                        {project.final_mark}&nbsp;%
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "yellow",
                        }}
                      >
                        In progress
                      </Text>
                    )}
                  </View>
                </View>
              ))}
          </View>
        </View>
      )}
    </>
  );
}

function Achievements({ achievements }) {
  return (
    <>
      {achievements && achievements.length > 0 && (
        <View>
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Achievements
            </Text>
          </View>
          {achievements.map((achievement, index) => (
            <View style={{ paddingHorizontal: 30 }} key={index}>
              <View
                style={{
                  width: "100%",
                  height: 80,
                  backgroundColor: "#FFF",
                  borderRadius: 12,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  marginVertical: 5,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: "#DEDEDE",
                }}
              >
                <View
                  style={{
                    width: "82%",
                    padding: 12,
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {achievement?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "#999",
                    }}
                  >
                    {achievement?.description}
                  </Text>
                </View>
                <View
                  style={{
                    width: "18%",
                    height: "100%",
                    backgroundColor: "#BEBEBE",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SvgCssUri
                    width="40px"
                    height="40px"
                    uri={`https://api.intra.42.fr/` + achievement.image}
                    fill="#fff"
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </>
  );
}

function SkillsComponent({ skills }) {
  return (
    <>
      {skills && skills.length > 0 && (
        <View>
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Skills
            </Text>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <View
              style={{
                paddingHorizontal: 15,
                backgroundColor: "white",
                borderRadius: 15,
              }}
            >
              {skills.map((skill, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <View
                    key={skill?.id}
                    style={{
                      width: "100%",
                      height: 30,
                      borderRadius: 12,
                      padding: 9,
                      flexDirection: "row",
                      marginVertical: 5,
                      width: "45%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {skill.name.length <= 18
                        ? skill.name
                        : `${skill.name.substring(0, 18)}...`}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 10,
                      backgroundColor: "rgba(32,32,38,0.35)",
                      borderRadius: 12,
                      width: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        width: `${skill.level}%`,
                        height: "100%",
                        backgroundColor: "#00babc",
                        borderRadius: 12,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </>
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
