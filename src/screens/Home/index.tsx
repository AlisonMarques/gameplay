import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLLECTION_APPOINTMENTS } from '../../configs/database';

import { View, FlatList } from 'react-native';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { style } from './style';

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  //Estado para listar os agendamentos/appointments
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  // Efeito de marcar e desmarcar o CardCategory
  function hadleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppoitments() {
    const response = await AsyncStorage.getItem(COLLLECTION_APPOINTMENTS);

    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    //Se a category estiver selecionada, irá filtrar os agendamentos que tem a mesma category
    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  //Função que vai averiguar se houve alteração de dados e recarregar a lista
  useFocusEffect(
    useCallback(() => {
      loadAppoitments();
    }, [category])
  );

  return (
    <Background>
      <View style={style.container}>
        <View style={style.header}>
          <Profile />
          <ButtonAdd activeOpacity={0.7} onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect
          categorySelected={category}
          setCategory={hadleCategorySelect}
        />

        {loading ? (
          <Load />
        ) : (
          <>
            <ListHeader
              title="Partidas agendadas"
              subtitle={`${appointments.length}`}
            />
            <FlatList
              data={appointments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
              style={style.matches}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </Background>
  );
}
