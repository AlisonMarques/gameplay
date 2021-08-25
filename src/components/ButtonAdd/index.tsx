import React from 'react';
import { View, TouchableOpacityProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

import { Container } from './style';

export function ButtonAdd({ ...rest }: TouchableOpacityProps) {
  return (
    <Container {...rest}>
      <MaterialCommunityIcons
        name="plus"
        color={theme.colors.heading}
        size={24}
      />
    </Container>
  );
}
