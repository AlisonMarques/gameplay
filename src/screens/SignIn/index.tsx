import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import IllustrationImg from '../../assets/illustration.png';
import { Container, Content, Title, Img, Subtitle } from './style';

export function SignIn() {
  const navigation = useNavigation();
  const win = Dimensions.get('window');

  function handleSignIn() {
    navigation.navigate('Home');
  }

  return (
    <Background>
      <Container>
        <Img
          source={IllustrationImg}
          resizeMode="stretch"
          style={{ height: win.width * 0.7 }}
        />

        <Content>
          <Title>
            Conecte-se {'\n'}e organize suas {'\n'}
            jogatinas
          </Title>

          <Subtitle>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Subtitle>

          <ButtonIcon
            title="Entrar com Discord"
            activeOpacity={0.7}
            onPress={handleSignIn}
          />
        </Content>
      </Container>
    </Background>
  );
}
