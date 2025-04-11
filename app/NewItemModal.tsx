import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { generateId, ItemProp } from "@/hooks/useShoppingList";
import { useMemo, useState } from "react";
import { ColoredRadioButton } from "../components/ColoredRadioButton";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "@/constants/Dimensions";
import { Pallete } from "@/constants/Colors";

type Props = {
    style?: ViewStyle,
    onAddItem: (item: ItemProp) => void,
    onClickClose: () => void
}

const colors = Object.entries(Pallete).map((entry, _) => entry[1]);

export function ItemModal({ style, onAddItem, onClickClose}: Props) {
    let [name, setName] = useState("")
    let [price, setPrice] = useState("0.0")
    let [color, setColor] = useState(colors[0])
    let isButtonDisabled = useMemo(() => {
        const number = Number(price)
        return name.length == 0 || isNaN(number) || number <= 0
    }, [name, price]);

    const handleAddProducto = () : void => {
        let newProduct: ItemProp = {
            id: generateId(),
            name: name,
            marked: false,
            color: color,
            price: Number(price)
        }
        onAddItem(newProduct)
    }

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                style={{ position: 'absolute', top: 15, right: 15}}
                onPress={onClickClose}>
                <Ionicons name="close" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>New item</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Product name" />
            <View style={{ height: 15 }} />
            <TextInput 
                style={styles.input} 
                value={price.toString()} 
                keyboardType="decimal-pad"
                onChangeText={setPrice} 
                placeholder="$0.00" />
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginVertical: 15 }}>
                {colors.map((colorName) => (
                    <ColoredRadioButton 
                        key={colorName}
                        color={colorName} 
                        selected={color == colorName} 
                        onPress={() => setColor(colorName)} />
                ))}
            </View>
            <Button title="Add item" disabled={isButtonDisabled} onPress={handleAddProducto} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: Dimensions.horizontalSpace,
        alignItems: 'center',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 30,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 18, 
        marginVertical: 15
    }
});