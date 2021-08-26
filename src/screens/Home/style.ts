import { StyleSheet } from 'react-native';
// biblioteca para fazer a responsividade do topo do iphone
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() + 26,
    marginBottom: 42,
  },

  content: {
    marginTop: 42,
  },

  matches: {
    marginTop: 24,
    marginLeft: 24,
  },
});

// export const Container = styled.View`
//   flex: 1;
// `;

// export const Header = styled.View`
//   width: 100%;
//   padding: 24px;
//   flex-direction: row;
//   justify-content: space-between;
//   margin-top: ${getStatusBarHeight() + 26}px;
//   margin-bottom: 42px;
// `;
