import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites(){

    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {
        // AsyncStorage armazena texto apenas. Usar json pra armazenar array ou objeto.
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);                  
                setFavorites(favoritedTeachers);
            }
        });
    }

    // UseEffect Recebe dois parâmetros: A função que será disparada, e quando ela será disparada
    // Se deixar vazio o "quando", ele dispara uma vez só no começo do componente
    // Se preencher com alguma variável, toda vez que aquela variável mudar ele dispara de novo
    /*
    useEffect(() => {
        loadFavorites()
    }, []);
    */

    // O useFocusEffect executa toda vez que a tela entrar em foco, por exemplo na navegação entre abas
    useFocusEffect(() => {
        loadFavorites();
    });
    
    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;