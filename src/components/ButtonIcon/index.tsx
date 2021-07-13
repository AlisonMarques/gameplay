import React, { RefAttributes } from 'react';
import { View, Text, Image, TouchableOpacityProps } from 'react-native';

import DiscordImg from '../../assets/discord.png';
import { Container, IconWrapper, IconImg, Title } from './style';

type Props = TouchableOpacityProps & {
  title: string;
};

export function ButtonIcon({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <IconWrapper>
        <IconImg source={DiscordImg} />
      </IconWrapper>
      <Title>{title}</Title>
    </Container>
  );
}
