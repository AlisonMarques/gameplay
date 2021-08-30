import React from 'react';
import { View } from 'react-native';
import { Avatar } from '../Avatar';
import { Container, Greeting, Message, User, Username } from './style';

export function Profile() {
  return (
    <Container>
      <Avatar urlImage="https://github.com/alisonmarques.png" />

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
