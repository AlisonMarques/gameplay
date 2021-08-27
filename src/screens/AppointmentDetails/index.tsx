import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { ImageBackground, Text, View, FlatList } from 'react-native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

import { style } from './style';
import { theme } from '../../global/styles/theme';
import BannerPng from '../../assets/banner.png';

export function AppointmentDetails() {
  const members = [
    {
      id: '1',
      username: 'Alison',
      avatar_url: 'https://github.com/alisonmarques.png',
      status: 'Online',
    },
    {
      id: '2',
      username: 'Alison',
      avatar_url: 'https://github.com/alisonmarques.png',
      status: 'Offline',
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={BannerPng} style={style.banner}>
        <View style={style.bannerContent}>
          <Text style={style.title}>Lendários</Text>

          <Text style={style.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>
      <ListHeader title="Jogadores" subtitle="Total 3" />
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={style.members}
      />

      <View style={style.footer}>
        <ButtonIcon title="Entrar na partida" activeOpacity={0.7} />
      </View>
    </Background>
  );
}
