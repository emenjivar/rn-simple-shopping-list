import { Button, FlatList, Modal, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Item } from "../components/Item";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { ItemModal } from "./NewItemModal";
import { Dimensions } from "@/constants/Dimensions";
import useShoppingList from "@/hooks/useShoppingList";

export default function IndexScreen() {
    const { 
        items, 
        filter, 
        totalPrice, 
        addItem, 
        deleteItem, 
        selectItem, 
        setFilter 
    } = useShoppingList();
    let [displayModal, setDisplayModal] = useState(false)

    const showModal = () => setDisplayModal(true)
    const hideModal = () => setDisplayModal(false)

    return (
        <View style={styles.screen}>
            <View style={{ 
                flexDirection: 'row', 
                width: '100%', 
                justifyContent: 'space-between', 
                marginTop: 40, 
                marginBottom: 10,
                paddingHorizontal: Dimensions.horizontalSpace
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Shopping list</Text>
                <Text style={{ fontSize: 15 }}>${totalPrice}</Text>
            </View>
            
            <SearchBar 
                text={filter} 
                style={{ marginHorizontal: Dimensions.horizontalSpace }}
                placeholder="E.g. Coffee" 
                onChangeText={setFilter}/>

            <FlatList 
                data={items} 
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                <Item 
                    name={item.name} 
                    price={item.price}
                    marked={item.marked} 
                    color={item.color}
                    style={{ marginHorizontal: Dimensions.horizontalSpace }}
                    onSelect={(selected) => {
                        selectItem(index, selected)
                    }}
                    onDelete={() => {
                        deleteItem(item.id)
                    }}
                    />
            )} />

            <Button title="Add item" onPress={showModal} />
            <Modal 
                animationType="slide" 
                transparent={true} 
                visible={displayModal} 
                onRequestClose={hideModal}>
                <View 
                    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'flex-end'}}>
                    <ItemModal 
                        onAddItem={(item) => {
                            addItem(item)
                            hideModal()
                        }}
                        onClickClose={hideModal} />
                </View>
                
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        position: 'relative'
    },
    searchInput: {
        width: '100%',
        height: 40
    }
});