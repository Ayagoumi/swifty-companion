import { View, Text, StyleSheet } from "react-native";
import DataText from "./DataText";
import Moment from "moment";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/Feather";
import BlackHole from "./BlackHole";

export default function DataLevel({
  data,
  selected,
  items,
  Bgcolor,
  setSelected,
  remaining,
}) {
  const isValidated = () => {
    if (data?.projects_users) {
      const filtered = data?.projects_users?.filter(
        (obj) => obj?.project?.name === "ft_transcendence"
      );
      if (filtered?.length > 0) {
        return filtered[0]?.["validated?"];
      }
    }
    return false;
  };

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: "rgba(32,32,38,0.85)",
        borderRadius: 12,
        flex: 1,
      }}
    >
      <DataText dataName={data?.wallet + " ₳"} text="Wallet" color={Bgcolor} />
      <DataText
        dataName={data?.correction_points}
        text="Evaluation points"
        color={Bgcolor}
      />
      {items.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: Bgcolor,
            }}
          >
            Cursus
          </Text>
          <SelectDropdown
            data={items}
            defaultValue={items[0]}
            renderDropdownIcon={() => (
              <Icon name="chevron-down" size={18} color="white" />
            )}
            dropdownIconPosition="right"
            onSelect={(selectedItem, index) => {
              setSelected(index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            dropdownStyle={{
              borderRadius: 12,
              backgroundColor: "rgba(32,32,38,0.35)",
            }}
            buttonStyle={{
              width: "50%",
              backgroundColor: "transparent",
              margingVertical: 0,
              margingVertical: 0,
              paddingVertical: 0,
              paddingHorizontal: 0,
              height: 20,
              maxWidth: "50%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
            rowStyle={{
              borderBottomColor: "transparent",
              borderBottomWidth: 0,
            }}
            rowTextStyle={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
          />
        </View>
      )}
      {data?.cursus_users[selected]?.grade ? (
        <DataText
          dataName={data?.cursus_users[selected]?.grade}
          text="Grade"
          color={Bgcolor}
        />
      ) : (
        <DataText dataName="Novice" text="Grade" color={Bgcolor} />
      )}
      {data?.anonymize_date && (
        <DataText
          dataName={Moment(data?.anonymize_date).format("DD-MM-YYYY")}
          text="ETEC"
          color={Bgcolor}
        />
      )}
      {data?.cursus_users[selected]?.cursus?.name === "42cursus" &&
        isValidated() === false &&
        remaining >= 0 && <BlackHole remaining={remaining} Bgcolor={Bgcolor} />}
    </View>
  );
}
