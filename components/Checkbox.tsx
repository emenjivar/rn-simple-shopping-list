import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    checked: boolean,
    onClick: (value: boolean) => void
}

export function Checkbox({ checked, onClick }: Props) {
    return (
        <TouchableOpacity 
            style={[styles.checkbox, checked && styles.selected]} 
            onPress={() => { onClick(!checked) }}>
            {checked && <Ionicons name="checkmark" size={15} color="white" />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 25,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    selected: {
        backgroundColor: '#c0c0c0',
    }
});