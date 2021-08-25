import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

import { Container, Image } from './style';

type Props = {
  urlImage: string;
};

export function Avatar({ urlImage }: Props) {
  const { secondary50, secondary70 } = theme.colors;

  return (
    <Container>
      <LinearGradient colors={[secondary50, secondary70]}>
        <Image source={{ uri: urlImage }} />
      </LinearGradient>
    </Container>
  );
}
