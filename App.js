import { useState } from 'react';
import {View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet} from 'react-native';


export default function App() {

    const [list, setList] = useState("");
    const [lists, setLists] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    const handleAddList = () => {
        if (list) {
            if (editIndex !== -1) {
                // Edit existing item
                const updatedLists = [...lists];
                updatedLists[editIndex] = list;
                setLists(updatedLists);
                setEditIndex(-1);
            } else {
                // Adding new item to list
                setLists([...lists, list]);
            }
            setList("");
        }
    };
  
    const handleEditList = (index) => {
        const listToEdit = list[index];
        setList(listToEdit);
        setEditIndex(index);
    };
  
    const handleDeleteList = (index) => {
        const updatedLists = [...lists];
        updatedLists.splice(index, 1);
        setLists(updatedLists);
    };
  
    const renderItem = ({ item, index }) => (
        <View style={styles.list}>
            <Text
                style={styles.itemList}>{item}</Text>
            <View
                style={styles.taskButtons}>
                <TouchableOpacity
                    onPress={() => handleEditList(index)}>
                    <Text
                        style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDeleteList(index)}>
                    <Text
                        style={styles.deleteButton}>Del</Text> 
                </TouchableOpacity>
                </View>
        </View>
    );

  return (
    <View style={styles.container}>
            <Text style={styles.heading}>Shopping List</Text>
            <Text style={styles.title}>Plan the shopping list wisely</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter an item"
                value={list}
                onChangeText={(text) => setList(text)}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddList}>
                <Text style={styles.addButtonText}>
                    {editIndex !== -1 ? "Update Task" : "Add Task"}
                </Text>
                
            </TouchableOpacity>
            {lists.length === 0 && <Text style={styles.infoText}>Shopping List is Empty</Text> }
            <FlatList
                data={lists}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.bottomText} >- Design by Isaiah -</Text>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40,
    },
    title: {
        fontSize: 12,
        fontWeight: "normal",
        marginBottom: 20,
        alignSelf: 'center'
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 7,
        color: "green",
        alignSelf: 'center'
    },
    input: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    addButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    list: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        fontSize: 18,
    },
    itemList: {
        fontSize: 19,
    },
    taskButtons: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
        color: "green",
        fontWeight: "normal",
        fontSize: 15,
    },
    deleteButton: {
        color: "red",
        fontWeight: 'normal',
        fontSize: 15,
    },
    bottomText: {
      alignSelf: 'center',
      fontSize: 10,
    },
    infoText: {
      alignSelf: 'center',
      fontSize: 15,
    },
});
