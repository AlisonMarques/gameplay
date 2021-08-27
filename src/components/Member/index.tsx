import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../Avatar';

import { style } from './style';
import { theme } from '../../global/styles/theme';

export type MemberProps = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
};

type Props = {
  data: MemberProps;
};

export function Member({ data }: Props) {
  const { on, primary } = theme.colors;
  const isOnline = data.status === 'Online';

  return (
    <View style={style.container}>
      <Avatar urlImage={data.avatar_url} />

      <View>
        <Text style={style.title}>{data.username}</Text>

        <View style={style.status}>
          <View
            style={[
              style.bulletStatus,
              { backgroundColor: isOnline ? on : primary },
            ]}
          />

          <Text style={style.nameStatus}>
            {isOnline ? 'Disponível' : 'Ocupado'}
          </Text>
        </View>
      </View>
    </View>
  );
}
