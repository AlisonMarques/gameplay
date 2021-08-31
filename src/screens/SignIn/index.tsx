import React from 'react';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Dimensions } from 'react-native';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import IllustrationImg from '../../assets/illustration.png';
import { Container, Content, Title, Img, Subtitle } from './style';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const { loading, signIn } = useAuth();
  const win = Dimensions.get('window');

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
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

          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon
              title="Entrar com Discord"
              activeOpacity={0.7}
              onPress={handleSignIn}
            />
          )}
        </Content>
      </Container>
    </Background>
  );
}
