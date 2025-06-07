import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";

import { Card } from "@ant-design/react-native";

import moment from "moment";

import { deleteMethod, get, post } from "../../../utils/Api";
import CustomInput from "../../components/CustomInput";

const ChangeCardIdScreen = () => {
  const [data, setData] = useState([]);
  const [newId, setNewId] = useState(null);
  const [reload, setReload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    get("/card_id").then((res) => {
      setData(res.data);
    });
  }, [reload]);

  const addCardId = (id) => {
    post("/card_id", { id_card: id })
      .then((res) => {
        setReload(!reload);
        setNewId(null);
        setModalVisible(!modalVisible);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCardId = (id) => {
    deleteMethod(`/card_id/${id}`)
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
              >
                Please provide Card ID
              </Text>
              <CustomInput value={newId} setValue={setNewId}></CustomInput>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { marginRight: 10 },
                  ]}
                  onPress={() => addCardId(newId)}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>

      <Pressable
        style={styles.openStatus}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={[{ color: "green", fontSize: 18 }]}>Add Card ID</Text>
      </Pressable>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Card style={styles.item}>
            <Card.Header
              title={moment(new Date(item.createdAt)).format("DD/MM/YYYY")}
              thumbStyle={{ width: 20, height: 20 }}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra={moment(new Date(item.createdAt)).format("hh:mm:ss")}
            ></Card.Header>
            <Card.Body>
              <View style={styles.openText}>
                <Text style={styles.openType}>{item.id_card}</Text>
                <Pressable
                  style={styles.openStatus}
                  onPress={() => deleteCardId(item._id)}
                >
                  <Text
                    style={[
                      { color: item.status ? "green" : "red", fontSize: 18 },
                    ]}
                  >
                    Delete
                  </Text>
                </Pressable>
              </View>
            </Card.Body>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    marginBottom: 122,
  },
  item: {
    width: 300,
    height: 100,
    padding: 10,
    marginTop: 20,
  },
  openText: {
    marginLeft: 16,
    flexDirection: "row",
  },
  openType: {
    fontSize: 18,
  },
  openStatus: {
    fontSize: 18,
    marginLeft: "auto",
    marginRight: 16,
  },
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChangeCardIdScreen;
