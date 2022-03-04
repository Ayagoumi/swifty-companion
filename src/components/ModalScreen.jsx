import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import BigCoalationView from "./BigCoalationView";
import DropDownPicker from "react-native-dropdown-picker";

export default function ModalScreen({ navigation, route }) {
  const data = route.params?.userData;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const cursus = () => {
    const tab = [];

    if (data?.cursus_users) {
      data?.cursus_users.map((cursus) => {
        const obj = {
          label: cursus.cursus.name,
          value: cursus.cursus.name,
          id: cursus.cursus.id,
        };
        tab.push(obj);
      });
    }
    return tab;
  };

  useEffect(() => {
    if (data) {
      setItems(cursus());
    }
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAF8" }}>
      <BigCoalationView
        coalitions={data?.coalitions[0]}
        cover_url={data?.coalitions[0]?.cover_url}
        name={data?.name}
        staff={data?.staff}
        bgstyle={styles.bgstyle}
        login={data?.login}
        image_url={data?.image_url}
        data={data}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bgstyle: {
    height: 290,
    overflow: "hidden",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
  },
});
