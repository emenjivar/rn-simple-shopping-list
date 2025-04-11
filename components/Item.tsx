import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { Checkbox } from "./Checkbox";
import { Ionicons } from "@expo/vector-icons";

type Props  = {
    name: string,
    price: number,
    marked: boolean,
    color: string,
    style?: ViewStyle,
    disable?: boolean,
    onSelect: (selected: boolean) => void,
    onDelete: () => void
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export function Item({
    name, 
    price, 
    marked, 
    color, 
    style, 
    disable = false,
    onSelect, 
    onDelete
}: Props) {
    return(
        <View style={[styles.container, style]}>
            <View style={[styles.row, { paddingHorizontal: 10 }]}>
                <View style={styles.row}>
                    <Checkbox 
                        checked={marked} 
                        disable={disable}
                        onClick={onSelect} />
                    <View style={{width: 10 }} />
                    <Text style={[styles.title, marked && styles.striketext]}>{capitalize(name)} - ${price}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={onDelete}>
                    <Ionicons name="close" color="white" size={16} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 15 }} />
            <View style={[styles.divider, { backgroundColor: color}]} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 15
    },
    divider: {
        height: 2,
        alignSelf: 'stretch',
    },
    button: {
        width: 25,
        height: 25,
        backgroundColor: 'black',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttontext: {
        color: 'white',
        fontSize: 10
    },
    striketext: {
        textDecorationLine: 'line-through'
    }
});