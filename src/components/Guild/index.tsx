import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native';

import { GuildIcon } from '../GuildIcon';

import { Feather } from '@expo/vector-icons';
import { style } from './style';
import { theme } from '../../global/styles/theme';

export type GuildProps = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
};

type Props = TouchableOpacityProps & {
  data: GuildProps;
};

export function Guild({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={style.container} activeOpacity={0.7} {...rest}>
      <GuildIcon />

      <View style={style.content}>
        <View>
          <Text style={style.title}>{data.name}</Text>

          <Text style={style.type}>
            {data.owner ? 'Administrador' : 'Convidado'}
          </Text>
        </View>
      </View>

      <Feather name="chevron-right" color={theme.colors.heading} size={24} />
    </TouchableOpacity>
  );
}
