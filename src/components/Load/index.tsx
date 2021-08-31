import React from 'react';

import { View, ActivityIndicator } from 'react-native';

import { theme } from '../../global/styles/theme';
import { style } from './style';

export function Load() {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
