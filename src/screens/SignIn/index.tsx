import React from 'react';
import { View, Text, Image, StatusBar, Dimensions } from 'react-native';
import { ButtonIcon } from '../../components/ButtonIcon';

import IllustrationImg from '../../assets/illustration.png';
import { Container, Content, Title, Img, Subtitle } from './style';

export function SignIn() {
  const win = Dimensions.get('window');

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Img
        source={IllustrationImg}
        resizeMode="stretch"
        style={{ height: win.width * 0.7 }}
      />

      <Content>
        <Title>
          Organize {'\n'}
          suas jogatinas {'\n'}
          facilmente
        </Title>

        <Subtitle>
          Crie grupos para jogar seus games {'\n'}
          favoritos com seus amigos
        </Subtitle>

        <ButtonIcon title="Entrar com Discord" activeOpacity={0.7} />
      </Content>
    </Container>
  );
}
