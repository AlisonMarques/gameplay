import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';

import { style } from './style';

export function Home() {
  const [category, setCategory] = useState('');

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

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Profile />
        <ButtonAdd activeOpacity={0.7} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={hadleCategorySelect}
      />

      <View style={style.content}>
        <ListHeader title="Partidas agendadas" subtitle="Total 6" />
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Appointment data={item} />}
          ItemSeparatorComponent={() => <ListDivider />}
          style={style.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
