import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/weatherIcon'

import { Searchbar, TextInput, Button } from 'react-native-paper';
import moment from 'moment-timezone';

import axios from 'axios';
import { REACT_APP_OPEN_WEATHER_KEY } from '@env'


export default function Weather() {

    const [Data, setData] = useState([]);
    const [DataPrev, setDataPrev] = useState([]);
    const [city, setCity] = useState(`Fécamp`);
    const [borderColor, setBorderColor] = useState('#293d46');
    const [color, setColor] = useState('#FFF');
    const [boxBackgroundColor, setBoxBackgroundColor] = useState('#293d46');
    const [backgroundColor, setBackgroundColor] = useState('#000');
    const [iconColor, setIconColor] = useState('#FFCA7C');
    const [description, setDescription] = useState(Data.weather?.[0].description);

    const data = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${REACT_APP_OPEN_WEATHER_KEY}`);
        const json = await response.json();
        console.log("--- log json ---", json);
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
    }

    const dataPrev = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${REACT_APP_OPEN_WEATHER_KEY}`);
        const json = await response.json();
        console.log("--- log prevision ---", json);
        return json;
    }

    const datainitPrev = async () => {
        await dataPrev().then(dataPrev => {
            setDataPrev(dataPrev);
            console.log(dataPrev);
        }
        )
            .catch(error => {
                console.log(error);
            }
            )
    }

    const themeWeather = () => {
        if (Data.weather?.[0].description === 'ciel dégagé') {
            setBackgroundColor('#aec5eb');
            setBoxBackgroundColor('#838fc3');
            setBorderColor('#838fc3');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------Dégagé--------')
        } else if (Data.weather?.[0].description === 'nuageux') {
            setBackgroundColor('#000');
            setBoxBackgroundColor('#293d46');
            setBorderColor('#293d46');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------nuageux--------')

        } else if (Data.weather?.[0].description === 'couvert') {
            setBackgroundColor('#000');
            setBoxBackgroundColor('#293d46');
            setBorderColor('#293d46');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------Couvert--------')

        } else if (Data.weather?.[0].description === 'peu nuageux') {
            setBackgroundColor('#aec5eb');
            setBoxBackgroundColor('#838fc3');
            setBorderColor('#838fc3');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------peu nuageux--------')
        } else if (Data.weather?.[0].description === 'légère pluie') {
            setBackgroundColor('#000');
            setBoxBackgroundColor('#293d46');
            setBorderColor('#293d46');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------légère pluie--------')
        } else if (Data.weather?.[0].description === 'pluie') {
            setBackgroundColor('#000');
            setBoxBackgroundColor('#293d46');
            setBorderColor('#293d46');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------Pluie--------')
        } else if (Data.weather?.[0].description === 'orage') {
            setBackgroundColor('#000');
            setBoxBackgroundColor('#293d46');
            setBorderColor('#293d46');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------Orage--------')
        } else if (Data.weather?.[0].description === 'neige') {
            setBackgroundColor('#edf2f4');
            setBoxBackgroundColor('#293d46');
            setBorderColor('#293d46');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------Neige--------')
        } else if (Data.weather?.[0].description === 'brume') {
            setBackgroundColor('#7f7979');
            setBoxBackgroundColor('#293d46');
            setBorderColor('#293d46');
            setColor('#FFF');
            setIconColor('#FFCA7C');
            console.log('------brume--------')
        }
    }

    useEffect(() => {
        datainit();

    }
        , [])

    useEffect(() => {
        datainitPrev();

    }
        , [])

    useEffect(() => {
        themeWeather();
    }
        , [themeWeather])


    return (
        <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
            <Text style={[styles.city, { color: color }]}>{Data.name}</Text>
            <Searchbar iconColor={iconColor} onChangeText={text => { setCity(text) }} value={city} onBlur={() => { datainit(); themeWeather(); datainitPrev(); }}
                placeholderTextColor="#b5c0d1" style={[styles.searchbar, { backgroundColor: boxBackgroundColor }]} placeholder='Entrer le nom d&apos;une ville' />
            <ScrollView tyle={styles.scroll}>

                <ImageBackground style={{ height: 255, width: '100%', alignSelf: 'center' }} source={require('../images/map.png')}>
                    {(typeof (Data.coord) == "undefined") &&

                        <Text style={styles.noData}>Aucune données pour cette ville</Text>
                    }
                    <View>
                        <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/${Data.weather?.[0].icon}@2x.png` }} />
                        <View>
                            <Text style={[styles.temp, { color: color }]}>{Data.main?.temp}°C</Text>
                        </View>
                        <View>
                            <Text style={[styles.description, { color: color }]} onChangeText={() => { themeWeather() }} > {Data.weather?.[0].description}</Text>
                        </View>
                    </View>
                </ImageBackground>

                <ScrollView horizontal={true} style={{ flex: 1, flexDirection: 'row', marginVertical: 20}}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[0].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[0].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[0].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[0].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[1].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[1].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[1].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[1].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[2].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[2].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[2].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[2].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[3].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[3].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[3].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[3].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[4].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[4].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[4].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[4].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[7].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[5].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[5].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[5].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[6].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[6].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[6].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[6].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[7].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[7].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[7].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[7].wind.speed} km/h</Text>      
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{moment.unix(DataPrev.list?.[8].dt).format('HH:mm')}</Text>
                            <Image style={styles.iconPrev} source={{ uri: `http://openweathermap.org/img/wn/${DataPrev.list?.[8].weather?.[0].icon}@2x.png` }} />
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[8].main.temp} °C</Text>                       
                            <Text style={[styles.itemTitlePrev, { color: color }]}>{DataPrev.list?.[8].wind.speed} km/h</Text>      
                        </View>
                </ScrollView>


                <View style={[styles.temp_sun, { backgroundColor: boxBackgroundColor, color: color }]}>

                    <View style={styles.max_min}>
                        <Text style={[styles.itemTitle, { color: color }]}>Min {Data.main?.temp_min}°C</Text>
                        <Text style={[styles.itemTitle, { color: color }]}>Max {Data.main?.temp_max}°C</Text>
                    </View>
                    <View style={styles.sunIcon}>
                        <Icon name="wi-sunrise" size={50} color={iconColor} />
                        <Icon name="wi-sunset" size={50} color={iconColor} />
                    </View>
                    <View style={styles.sun}>
                        <Text style={[styles.itemTitle, { color: color }]}>Lever du soleil à {moment.unix(Data.sys?.sunrise).format('HH:mm')}</Text>
                        <Text style={[styles.itemTitle, { color: color }]}>Coucher du soleil à {moment.unix(Data.sys?.sunset).format('HH:mm')}</Text>
                    </View>
                </View>

                

                <View style={[styles.weatherDetails, { backgroundColor: boxBackgroundColor }]}>
                    <View style={styles.detailsCol}>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-thermometer-exterior" size={45} color={iconColor} />
                                <View style={[styles.item, { color: color }]}>
                                    <Text style={[styles.itemTitle, { color: color }]}>Sensation réel</Text>
                                    <Text style={[styles.item, { color: color }]}>{Data.main?.feels_like} °C</Text>
                                </View>
                            </View>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-cloudy" size={45} color={iconColor} />
                                <View style={[styles.item, { color: color }]}>
                                    <Text style={[styles.itemTitle, { color: color }]}>Vitesse du vent</Text>
                                    <Text style={[styles.item, { color: color }]}>{Data.wind?.speed} km/h</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.detailsCol}>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-humidity" size={45} color={iconColor} />
                                <View style={[styles.item, { color: color }]}>
                                    <Text style={[styles.itemTitle, { color: color }]}>Humidité</Text>
                                    <Text style={[styles.item, { color: color }]}>{Data.main?.humidity} %</Text>
                                </View>
                            </View>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-barometer" size={45} color={iconColor} />
                                <View style={[styles.item, { color: color }]}>
                                    <Text style={[styles.itemTitle, { color: color }]}>Pression</Text>
                                    <Text style={[styles.item, { color: color }]}>{Data.main?.pressure} mBar</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.detailsCol}>
                        <View style={styles.detailsRow}>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-flood" size={45} color={iconColor} />
                                <View style={[styles.item, { color: color }]}>
                                    <Text style={[styles.itemTitle, { color: color }]}>Niveau du sol</Text>
                                    <Text style={[styles.item, { color: color }]}>{Data.main?.grnd_level} </Text>
                                </View>
                            </View>
                            <View style={styles.detailsBox}>
                                <Icon name="wi-tsunami" size={45} color={iconColor} />
                                <View style={[styles.item, { color: color }]}>
                                    <Text style={[styles.itemTitle, { color: color }]}>Niveau de la mer</Text>
                                    <Text style={[styles.item, { color: color }]}>{Data.main?.sea_level}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.last}>
                    <Text style={[styles.item, { color: color }]}> <Text style={[styles.itemTitle, { color: color }]}>Dernier relevé </Text>{moment.unix(Data.dt).format('dddd DD MMMM YYYY HH:mm')} </Text>
                </View>
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
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    itemTitle: {
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
        paddingHorizontal: 20,
        paddingVertical: 11,
        borderRadius: 20,
        marginBottom: 20,
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
    prev: {
        paddingHorizontal: 20,
        paddingVertical: 11,
        borderRadius: 20,
        marginBottom: 20,
        fontSize: 15,
        marginHorizontal: 5,
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        margin: 5,
        marginBottom: 15,
        textAlign: 'center',
    },
    noData: {
        fontSize: 18,
        textTransform: 'capitalize',
        marginVertical: 75,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 50,
        textAlign: 'center',
    },
    city: {
        paddingTop: 15,
        marginBottom: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    icon: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    iconPrev: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    itemTitlePrev: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        padding: 5,
    },
    searchbar: {
        height: 45,
        flexDirection: 'row-reverse',
        borderRadius: 20,
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
