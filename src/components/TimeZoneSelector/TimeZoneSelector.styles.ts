import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,
    width: '100%',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 40,
  },
  loader: {
    marginVertical: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  // ZoneItem
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  itemSelected: {
    backgroundColor: '#e3f2fd',
  },
  zoneName: {
    fontSize: 15,
    color: '#111',
  },
  zoneNameSelected: {
    fontWeight: '600',
    color: '#1565c0',
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
