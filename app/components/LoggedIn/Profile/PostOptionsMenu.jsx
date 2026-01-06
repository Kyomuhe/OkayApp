import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Edit, Trash2, X } from 'lucide-react-native';

const PostOptionsMenu = ({ visible, onClose, onEdit, onDelete }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => {
              onClose();
              onEdit();
            }}
          >
            <Edit size={20} color="#111827" />
            <Text style={styles.menuText}>Edit Story</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => {
              onClose();
              onDelete();
            }}
          >
            <Trash2 size={20} color="#EF4444" />
            <Text style={[styles.menuText, styles.deleteText]}>Delete Story</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={onClose}
          >
            <X size={20} color="#6B7280" />
            <Text style={styles.menuText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '80%',
    maxWidth: 300,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  deleteText: {
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
});

export default PostOptionsMenu;