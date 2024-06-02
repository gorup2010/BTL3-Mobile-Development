import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5E5F65',
  },

  labelHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 45,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE',
  },

  inputError: {
    borderColor: 'red',
  },
  input_des: {
    height: '35%',
    width: '100%',
    textAlignVertical: 'top',
    padding: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#D5D8DE',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '70%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default styles;
