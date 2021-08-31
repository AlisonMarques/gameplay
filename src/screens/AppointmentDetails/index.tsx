import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { api } from '../../servers/api';
import * as Linking from 'expo-linking';

import { Fontisto } from '@expo/vector-icons';

import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Alert,
  Share,
  Platform,
} from 'react-native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Load } from '../../components/Load';

import BannerPng from '../../assets/banner.png';
import { AppointmentProps } from '../../components/Appointment';

import { style } from './style';
import { theme } from '../../global/styles/theme';

type Params = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  // Pegando os dados que vem da tela Home
  const { guildSelected } = route.params as Params;

  //Pegando todas as informações tipado no GuildWidget do servidor
  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );

      setWidget(response.data);
    } catch (error) {
      Alert.alert(
        'Verifique as configurações do servidor. Seu Widget está habilidato?'
      );
    } finally {
      setLoading(false);
    }
  }

  // Função para compartilhar o servior
  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  //função que vai direcionar o usuário para o servidor
  function handleRedirectGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
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

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={style.members}
          />
        </>
      )}

      {guildSelected.guild.owner && (
        <View style={style.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleRedirectGuild}
            activeOpacity={0.7}
          />
        </View>
      )}
    </Background>
  );
}
