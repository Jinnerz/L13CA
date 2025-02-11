import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity} from 'react-native';
import soundfile from "./short1.wav";
import {Sound} from "expo-av/build/Audio/Sound";
import { Audio } from 'expo-av';

//sound - npx expo install expo-av

const styles = StyleSheet.create({
    TitleBox: {
        padding: 20,
        borderBottomWidth: 1,
    }
})

const Home = ({navigation}) => {
    const [myData, setMyData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [mySound, setMySound] = useState();

    //to help prevent issues from arising if user spams the button, unloading the sound before the next plays
    async function playSound() {
        if (mySound) {
            await mySound.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync(require('./short1.wav'));
        setMySound(sound);
        await sound.playAsync();
    }


    useEffect(() => {
        return mySound
            ? () => {
                console.log('Unloading Sound');
                mySound.unloadAsync();
            }
            :undefined
    }, [mySound]);

    useEffect(() => {
        fetch ("https://data.gov.sg/api/action/datastore_search?resource_id=d_688b934f82c1059ed0a6993d2a829089")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setMyData(myJson.result.records);
                setOriginalData(myJson.result.records);
            })
    }, []);

    //for search bar
    const FilterData = (text) => {
        if (text != '') {
            let myFilteredData = originalData.filter((item) =>
                //added .toLocaleUpperCase() since data set is all upper, and user can type lower if they want to
                item.school_name.includes(text.toLocaleUpperCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity
                onPress={()=>
                {
                    navigation.navigate("Details",{name: item.school_name, url: item.url_address, postal: item.postal_code, email: item.email_address, phone: item.telephone_no, principal: item.principal_name, viceprincipal: item.first_vp_name})
                    playSound();
                }
                }
            >
                <View style={{padding: 10, borderWidth: 1}}>
                    <Text>{item.school_name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <StatusBar/>

            <View>
                <View style={styles.TitleBox}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20,}}>School Information Singapore</Text>
                </View>

                <View style={{padding: 20}}>
                    <TextInput style={{borderWidth:1}} placeholder="Search School Name..." onChangeText={(text) =>{FilterData(text)}}/>
                </View>
                <FlatList data={myData} renderItem={renderItem} />

            </View>
        </View>
    );
};


export default Home;
