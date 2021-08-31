import React from 'react';
import { View, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';
import { Container, Greeting, Message, User, Username } from './style';

export function Profile() {
  const { user, signOut } = useAuth();

  function handleSignOut() {
    Alert.alert('Logout', 'Deseja sair do GamePlay?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => signOut(),
      },
    ]);
  }

  return (
    <Container>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View>
        <User>
          <Greeting>Olá,</Greeting>

          <Username>Alison</Username>
        </User>

        <Message>Hoje é dia de vitória</Message>
      </View>
    </Container>
  );
}
