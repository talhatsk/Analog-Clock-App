import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#ECECEC',
  },
  dbStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dbStatusText: {
    fontSize: 12,
    color: '#555',
  },
  dbStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 8,
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  timeZoneLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    width: 100,
    marginRight: 16,
  },
  clockWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorRow: {
    marginHorizontal: 24,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 4,
  },
  refetchText: {
    color: '#1565c0',
    fontSize: 14,
    fontWeight: '600',
  },
});
