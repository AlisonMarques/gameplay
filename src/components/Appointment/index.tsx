import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { categories } from '../../Utils/categories';

import { GuildIcon } from '../GuildIcon';
import { GuildProps } from '../Guild';

import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { style } from './style';
import { theme } from '../../global/styles/theme';

export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
};

type Props = RectButtonProps & {
  data: AppointmentProps;
};

export function Appointment({ data, ...rest }: Props) {
  // Pegando a primeira categoria do array
  const [category] = categories.filter((item) => item.id === data.category);

  const { owner } = data.guild;
  const { primary, on, secondary50, secondary70 } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={style.container}>
        <LinearGradient
          style={style.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>

        <View style={style.content}>
          <View style={style.header}>
            <Text style={style.title}>{data.guild.name}</Text>

            <Text style={style.category}>{category?.title}</Text>
          </View>

          <View style={style.footer}>
            <View style={style.dateInfo}>
              <CalendarSvg />

              <Text style={style.date}>{data.date}</Text>
            </View>

            <View style={style.playersInfo}>
              <PlayerSvg fill={owner ? primary : on} />

              <Text style={[style.player, { color: owner ? primary : on }]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
