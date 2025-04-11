import { Ionicons } from "@expo/vector-icons";
import { Button, Pressable, StyleSheet, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"

type Props = {
    style?: ViewStyle,
    onPress: () => void
}

export default function RoundedButton({ style, onPress }: Props) {
    return (
        <View style={style}>
            <Button title="Add item" onPress={onPress} />
        </View>
        
        // <View style={style}>
        //     <TouchableOpacity style={styles.button} onPress={() => {
        //         console.log("clicked")
        //     }}>
        //         <Ionicons name="add" color="white" size={30} style={{ alignSelf: 'center'}} />
        //     </TouchableOpacity>
        // </View>
        
    )
}

const styles = StyleSheet.create({
    button: {
        // width: 60,
        // height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        // backgroundColor: 'black',
        // justifyContent: 'center'
    }
});

