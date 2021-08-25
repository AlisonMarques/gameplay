import React from 'react';
import { Text, View } from 'react-native';

import { style } from './style';

type Props = {
    title: string;
    subtitle: string;
};

export function ListHeader({ title, subtitle}: Props) {
  return (
    <View style={style.container}>
        <Text style={style.title}>
            {title}
        </Text>

        <Text style={style.subtitle}>
            {subtitle}
        </Text>
    </View>
  );
}
