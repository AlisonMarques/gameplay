import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';
import { Container, Greeting, Message, User, Username } from './style';

export function Profile() {
  const { user } = useAuth();
  return (
    <Container>
      <Avatar urlImage={user.avatar} />

      <View>
        <User>
          <Greeting>Olá,</Greeting>

          <Username>{user.firstName}</Username>
        </User>

        <Message>Hoje é dia de vitória</Message>
      </View>
    </Container>
  );
}
