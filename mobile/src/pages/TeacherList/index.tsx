import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

//expo install @react-native-community/async-storage
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';
import { ScaleFromCenterAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFiltersVisible, setIsFilterVisible] = useState(true);

    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    function loadFavorites() {
        // AsyncStorage armazena texto apenas. Usar json pra armazenar array ou objeto.
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);     
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })         
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    /*
    useFocusEffect(() => {
        loadFavorites();
    });
    */

    function handleToogleFiltersVisible(){
        setIsFilterVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes',{
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
        setIsFilterVisible(false);
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToogleFiltersVisible}>
                        <Feather 
                            name="filter"
                            size={20}
                            color="#FFF"
                        />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>

                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>

                            {/* Usar picker pra fazer lista com opções */}
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >

            {teachers.map((teacher: Teacher)=> {
                return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher} 
                        favorited={favorites.includes(teacher.id)} />
                    )
            })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;