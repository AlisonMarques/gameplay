import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.Image`
  width: 100%;
  max-width: 375px;
`;

export const Content = styled.View`
  margin-top: -32px;
`;

export const Title = styled.Text`
  color: ${theme.colors.heading};
  text-align: center;
  line-height: 40px;
  font-size: 40px;
  margin-bottom: 16px;
  font-family: ${theme.fonts.title700};
`;

export const Subtitle = styled.Text`
  color: ${theme.colors.heading};
  font-size: 15px;
  line-height: 25px;
  margin-bottom: 64px;
  text-align: center;
  font-family: ${theme.fonts.title500};
`;
