import { useState } from "react";
import { View, Text } from "react-native";
import TitleMore from "./TitleMore";

export default function SkillsComponent({ skills, bgStyle }) {
  const [more, setMore] = useState(false);
  const skillsData = more ? skills : skills?.slice(0, 5);

  return (
    <>
      {skills && skills.length > 0 && (
        <View>
          <TitleMore setMore={setMore} more={more} title="Skills" bgStyle={bgStyle} />
          <View style={{ paddingHorizontal: 30 }}>
            <View
              style={{
                paddingHorizontal: 15,
                backgroundColor: "white",
                borderRadius: 15,
              }}
            >
              {skillsData.map((skill, index) => (
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
