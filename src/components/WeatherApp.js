import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/weatherIcon'

import { Searchbar } from 'react-native-paper';

export default function Weather({ lat, lon }) {
    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            <Text style={styles.city}>Fécamp, France</Text>
            <Searchbar iconColor="#FFCA7C" placeholderTextColor="#b5c0d1" style={styles.searchbar} placeholder='Entrer le nom d&apos;une ville' />
            <ScrollView tyle={styles.scroll}>
                <ImageBackground style={{ height: 255, width: '100%', alignSelf: 'center' }} source={require('../images/map.png')}>
                    <View>
                        <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/02d@2x.png` }} />
                        <View>
                            <Text style={styles.temp}>22°C</Text>
                        </View>
                        <View>
                            <Text style={styles.description}> Fé bo avec d nuage</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.temp_sun}>
                    <View style={styles.max_min}>
                        <Text style={styles.itemTitle}>Min 10°C</Text>
                        <Text style={styles.itemTitle}>Max 25°C</Text>
                    </View>
                    <View style={styles.sunIcon}>
                        <Icon name="wi-sunrise" size={50} color='#FFCA7C' />
                        <Icon name="wi-sunset" size={50} color='#FAD6A5' />
                    </View>
                    <View style={styles.sun}>
                        <Text style={styles.itemTitle}>Lever du soleil à 05:50</Text>
                        <Text style={styles.itemTitle}>Coucher du soleil à 22:08</Text>
                    </View>
                </View>

                <View style={styles.weatherDetails}>
                    <View style={styles.detailsCol}>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-thermometer-exterior" size={45} color='#FFCA7C' />
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>Sensation réel</Text>
                                    <Text style={styles.item}>18 °C</Text>
                                </View>
                            </View>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-cloudy" size={45} color='#FFCA7C' />
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>Vitesse du vent</Text>
                                    <Text style={styles.item}>13,2 km/h</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.detailsCol}>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-humidity" size={45} color='#FFCA7C' />
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>Humidité</Text>
                                    <Text style={styles.item}>80 %</Text>
                                </View>
                            </View>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-barometer" size={45} color='#FFCA7C' />
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>Pression</Text>
                                    <Text style={styles.item}>1000 mBar</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.detailsCol}>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-raindrop" size={45} color='#FFCA7C' />
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>Risque de pluie</Text>
                                    <Text style={styles.item}>0 %</Text>
                                </View>
                            </View>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-fire" size={45} color='#FFCA7C' />
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>Indice UV</Text>
                                    <Text style={styles.item}>5</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    detailsBox: {
        flex: 1,
        //borderWidth: 2,
        //borderColor: 'lightgray',
        //borderRadius: 10,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        color: '#FFF',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    itemTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    detailsRow: {
        flexDirection: 'row'
    },
    detailsCol: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    weatherDetails: {
        backgroundColor: '#293d46',
        padding: 5,
        borderRadius: 20,
        marginBottom: 50,
        marginHorizontal: 10,
        shadowColor: 'lightgray',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 5
    },
    sun: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sunIcon: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    max_min: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    temp_sun: {
        backgroundColor: '#293d46',
        padding: 14,
        borderRadius: 20,
        marginBottom: 25,
        color: '#FFF',
        fontSize: 15,
        marginHorizontal: 10,
        shadowColor: 'lightgray',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 5
    },
    description: {
        fontSize: 15,
        textTransform: 'capitalize',
        margin: 5,
        marginBottom: 15,
        textAlign: 'center',
        color: '#FFF',
    },
    temp: {
        fontSize: 50,
        textAlign: 'center',
        color: '#FFF'
    },
    city: {
        paddingTop: 15,
        marginBottom: 10,
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center'
    },
    icon: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    /*head: {
        backgroundColor: '#191970',
        width: '100%',
        height: 50,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 30,
    },*/
    scroll: {
        padding: 5,
    },
    searchbar: {
        height: 45,
        flexDirection: 'row-reverse',
        borderRadius: 20,
        backgroundColor: '#293d46',
        marginHorizontal: 20,
        shadowColor: 'lightgray',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 5
    }

});
