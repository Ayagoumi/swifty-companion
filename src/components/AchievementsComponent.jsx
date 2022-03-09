import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgCssUri } from "react-native-svg";
import TitleMore from "./TitleMore";

export default function Achievements({ achievements, bgStyle }) {
  const [more, setMore] = useState(false);
  const achievementsData = more ? achievements : achievements?.slice(0, 3);

  return (
    <>
      {achievements && achievements.length > 0 && (
        <View>
          <TitleMore
            setMore={setMore}
            more={more}
            title="Achievements"
            bgStyle={bgStyle}
          />
          {achievementsData.map((achievement, index) => (
            <View style={{ paddingHorizontal: 30 }} key={index}>
              <View style={styles.achievement}>
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

const styles = StyleSheet.create({
  achievement: {
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
  },
});
