import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, FlatList } from 'react-native';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';

import { style } from './style';

export function Home() {
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description:
        'E hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },

    {
      id: '2',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description:
        'E hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
  ];

  // Efeito de marcar e desmarcar o CardCategory
  function hadleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails');
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

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

        <ListHeader title="Partidas agendadas" subtitle="Total 6" />
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment data={item} onPress={handleAppointmentDetails} />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
          style={style.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Background>
  );
}
