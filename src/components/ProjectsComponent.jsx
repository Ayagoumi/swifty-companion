import { useState } from "react";
import { View, Text } from "react-native";
import TitleMore from "./TitleMore";

export default function Projects({ loading, projects, bgStyle }) {
  const [more, setMore] = useState(false);
  const projectsData = more ? projects : projects?.slice(0, 3);
  return (
    <>
      {projects && projects?.length > 0 && (
        <View>
          <TitleMore
            setMore={setMore}
            more={more}
            title="Projects"
            bgStyle={bgStyle}
          />
          <View style={{ paddingHorizontal: 30 }}>
            {loading &&
              projectsData?.map((project) => (
                <View
                  key={project?.project?.id}
                  style={{
                    width: "100%",
                    height: 60,
                    // backgroundColor: "rgba(41, 45, 57, 0.65)",
                    backgroundColor: "rgba(32,32,38,0.65)",
                    borderRadius: 12,
                    padding: 12,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#00babc",
                    }}
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
                          color: project["validated?"]
                            ? "rgb(42, 187, 119)"
                            : "#da5a51",
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
