
import { View, Text,StyleSheet } from "react-native"

export default function NoteDetails({ route }) {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Note Details</Text>
            <Text style={styles.header}>{item.header}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <Text style={styles.date}>Date: {item.date}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    comment: {
        fontSize: 16,
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
});