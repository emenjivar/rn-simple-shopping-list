import { StyleSheet, TextInput, View, ViewStyle } from "react-native"

type Props = {
    text: string,
    placeholder?: string,
    style?: ViewStyle,
    onChangeText: (text: string) => void
}

export default function SearchBar({ text, placeholder, style, onChangeText }: Props) {
    return (
        <View style={style}>
            <TextInput 
                style={styles.input}
                value={text}
                onChangeText={onChangeText}
                placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 30,
        paddingHorizontal: 15
    }
});