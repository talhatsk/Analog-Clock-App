import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // ClockFace
  face: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
  },
  number: {
    position: 'absolute',
    width: 20,
    height: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  // ClockHands
  handsContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hand: {
    position: 'absolute',
    backgroundColor: '#333',
    bottom: '50%',
    marginBottom: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  hourHand: {
    backgroundColor: '#222',
  },
  minuteHand: {
    backgroundColor: '#333',
  },
  secondHand: {
    backgroundColor: '#c00',
  },
});
