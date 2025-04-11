import { Button, FlatList, Modal, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Item } from "../components/Item";
import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import { ItemModal } from "./NewItemModal";
import { Dimensions } from "@/constants/Dimensions";

export type ItemProp = {
    name: string,
    marked: boolean,
    color: string,
    price: number
}

let items: ItemProp[] = [
    {
        name : "Oranges",
        marked: false,
        color: 'orange',
        price: 1.29
    },
    {
        name : "Tomatoes",
        marked: false,
        color: 'red' ,
        price: 1.99
    },
];

export default function IndexScreen() {
    let [data, setData] = useState(items)
    let [filter, setFilter] = useState("")
    let [displayModal, setDisplayModal] = useState(false)
    let fileredData = useMemo(() => {
        const lowerCaseFilter = filter.toLowerCase()
        return data.filter(item => item.name.toLowerCase().includes(lowerCaseFilter))
    }, [filter])
    let totalPrice = useMemo(() => {
        const sum = data.reduce((sum, item) => sum + item.price, 0)
        return sum.toLocaleString('en-US', { 
            minimumFractionDigits: 2, maximumFractionDigits: 2 
        })
    }, [data]);

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
                data={data} 
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                <Item 
                    name={item.name} 
                    price={item.price}
                    marked={item.marked} 
                    color={item.color}
                    style={{ marginHorizontal: Dimensions.horizontalSpace }}
                    onSelect={(selected) => {
                        let updated = [...data]
                        updated[index] = {...updated[index], marked: selected}
                        setData(updated)
                    }}
                    onDelete={() => {
                        let updated = [...data];
                        updated.splice(index, 1)
                        setData(updated)
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
                            setData([item, ...data])
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