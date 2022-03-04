import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import BigCoalationView from "./BigCoalationView";
import { SvgCssUri } from "react-native-svg";

export default function ModalScreen({ navigation, route }) {
  const data = route.params?.userData;
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(false);
  const DATA = [
    <BigCoalationView
      cover_url={data?.coalitions[0]?.cover_url}
      coalitions={data?.coalitions[0]}
      bgstyle={styles.bgstyle}
      data={data}
      setProjects={setProjects}
      setLoading={setLoading}
    />,
    <Projects loading={loading} projects={projects} />,
    <Achievements />,
  ];
  const renderItem = ({ item }) => <View>{item}</View>;
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => DATA.findIndex((i) => i === item)}
      renderItem={renderItem}
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

function Projects({ loading, projects }) {
  return (
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
                backgroundColor: "rgba(32,32,38,0.75)",
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
                      color: "red",
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
  );
}

// create a component get show only the achievements of the user from the data array

function Achievements({}) {
  return (
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
      <View style={{ paddingHorizontal: 30 }}>
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "rgba(32,32,38,0.75)",
            borderRadius: 12,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginVertical: 5,
            overflow: "hidden",
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
                fontSize: 12,
                fontWeight: "bold",
                color: "black",
              }}
            >
              All work and no play makes Jack a dull boy
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: "#999",
              }}
            >
              Logged for a total of 90 hours over a week.
            </Text>
          </View>
          <View
            style={{ width: "18%", height: "100%", backgroundColor: "#777777" }}
          >
            <SvgCssUri
              width="30px"
              height="50px"
              uri="https://api.intra.42.fr/uploads/achievement/image/41/SCO001.svg"
              fill="#fff"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
