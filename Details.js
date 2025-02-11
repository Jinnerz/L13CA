import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa", // Light background color
    },
    infoBox: {
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 8,
        color: "#333",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#2c3e50",
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

const Details = ({ navigation, route }) => {
    let name = route.params.name;
    let url =  route.params.url;
    let postal = route.params.postal;
    let email = route.params.email;
    let phone = route.params.phone;
    let principal = route.params.principal;
    let viceprincipal = route.params.viceprincipal;

    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.infoText}>🌐 URL: {url}</Text>
                <Text style={styles.infoText}>📍 Postal Code: SG{postal}</Text>
                <Text style={styles.infoText}>📧 School Email: {email}</Text>
                <Text style={styles.infoText}>📞 Telephone No.: {phone}</Text>
                <Text style={styles.infoText}>🏫 Principal: {principal}</Text>
                <Text style={styles.infoText}>👩‍🏫 Vice-Principal: {viceprincipal}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Details;
