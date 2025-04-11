import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native"

type Props = {
    color: string,
    selected?: boolean,
    onPress: (selected: boolean) => void
}

export function ColoredRadioButton({ color, selected = false, onPress} : Props) {
    return (
        <TouchableOpacity 
            style={[{backgroundColor: color}, styles.radio]}
            onPress={() => onPress(!selected)}>
                {selected && <Ionicons name="checkmark" color="white" size={30} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    radio: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
});