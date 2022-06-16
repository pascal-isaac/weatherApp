import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/weatherIcon'

import { Searchbar, TextInput } from 'react-native-paper';
import moment from 'moment-timezone';

import axios from 'axios';
import { REACT_APP_OPEN_WEATHER_KEY } from '@env'


export default function Weather() {

    //const cityName = `Fécamp`
    const [Data, setData] = useState([]);
    const [city, setCity] = useState(`Fécamp`);
    const data = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${REACT_APP_OPEN_WEATHER_KEY}`);
        const json = await response.json();
        console.log("Response du json", json);
        return json;
    }

    const datainit = async () => {
        await data().then(data => {
            setData(data);
            console.log(data);
        }
        )
        .catch(error => {
            console.log(error);
        }
        )
        //setCity('Rouen')
    }

    useEffect(() => {
        datainit();
    }
        , [])

    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            <Text style={styles.city}>{Data.name}</Text>
            <Searchbar iconColor="#FFCA7C" onChangeText={text => setCity(text)}  value={city}  onKeyPress={datainit} onBlur={() => datainit()}
           placeholderTextColor="#b5c0d1" style={styles.searchbar} placeholder='Entrer le nom d&apos;une ville' />
            <ScrollView tyle={styles.scroll}>
                <ImageBackground style={{ height: 255, width: '100%', alignSelf: 'center' }} source={require('../images/map.png')}>
                    {(typeof (Data.coord) != "undefined") &&
                        <View>
                            <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png` }} />
                            <View>
                                <Text style={styles.temp}>{Data.main.temp}°C</Text>
                            </View>
                            <View>
                                <Text style={styles.description}> {Data.weather[0].description}</Text>
                            </View>
                        </View>
                    }
                </ImageBackground>
                {(typeof (Data.coord) != "undefined") &&
                    <View style={styles.temp_sun}>

                        <View style={styles.max_min}>
                            <Text style={styles.itemTitle}>Min {Data.main.temp_min}°C</Text>
                            <Text style={styles.itemTitle}>Max {Data.main.temp_max}°C</Text>
                        </View>
                        <View style={styles.sunIcon}>
                            <Icon name="wi-sunrise" size={50} color='#FFCA7C' />
                            <Icon name="wi-sunset" size={50} color='#FAD6A5' />
                        </View>
                        <View style={styles.sun}>
                            <Text style={styles.itemTitle}>Lever du soleil à {moment.unix(Data.sys.sunrise).format('HH:mm')}</Text>
                            <Text style={styles.itemTitle}>Coucher du soleil à {moment.unix(Data.sys.sunset).format('HH:mm')}</Text>
                        </View>
                    </View>
                }
                {(typeof (Data.coord) != "undefined") &&
                    <View style={styles.weatherDetails}>
                        <View style={styles.detailsCol}>
                            <View style={styles.detailsRow}>
                                <View style={styles.detailsBox}>
                                    <Icon name="wi-thermometer-exterior" size={45} color='#FFCA7C' />
                                    <View style={styles.item}>
                                        <Text style={styles.itemTitle}>Sensation réel</Text>
                                        <Text style={styles.item}>{Data.main.feels_like} °C</Text>
                                    </View>
                                </View>
                                <View style={styles.detailsBox}>
                                    <Icon name="wi-cloudy" size={45} color='#FFCA7C' />
                                    <View style={styles.item}>
                                        <Text style={styles.itemTitle}>Vitesse du vent</Text>
                                        <Text style={styles.item}>{Data.wind.speed} km/h</Text>
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
                                        <Text style={styles.item}>{Data.main.humidity} %</Text>
                                    </View>
                                </View>
                                <View style={styles.detailsBox}>
                                    <Icon name="wi-barometer" size={45} color='#FFCA7C' />
                                    <View style={styles.item}>
                                        <Text style={styles.itemTitle}>Pression</Text>
                                        <Text style={styles.item}>{Data.main.pressure} mBar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.detailsCol}>
                            <View style={styles.detailsRow}>
                                <View style={styles.detailsBox}>
                                    <Icon name="wi-flood" size={45} color='#FFCA7C' />
                                    <View style={styles.item}>
                                        <Text style={styles.itemTitle}>Niveau du sol</Text>
                                        <Text style={styles.item}>{Data.main.grnd_level} </Text>
                                    </View>
                                </View>
                                <View style={styles.detailsBox}>
                                    <Icon name="wi-tsunami" size={45} color='#FFCA7C' />
                                    <View style={styles.item}>
                                        <Text style={styles.itemTitle}>Niveau de la mer</Text>
                                        <Text style={styles.item}>{Data.main.sea_level}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>}
                {(typeof (Data.coord) != "undefined") &&
                    <View style={styles.last}>
                        <Text style={styles.item}> <Text style={styles.itemTitle}>Dernier relevé </Text>{moment.unix(Data.dt).format('dddd DD MMMM YYYY HH:mm')} </Text>
                    </View>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    detailsBox: {
        flex: 1,
        margin: 5,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    last: {

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
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        marginBottom: 10,
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
        paddingHorizontal: 20,
        paddingVertical: 11,
        borderRadius: 20,
        marginBottom: 20,
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
