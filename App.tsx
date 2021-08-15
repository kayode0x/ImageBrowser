import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Button,
    Modal,
    Pressable
} from 'react-native';
import WordList from './src/components/WordList';

export interface IWords {
    image?: string;
    id?: string;
    images?: IWords[];
    remove?: (id: string) => void;
}

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [text, setText] = useState<string>('');
    const [images, setImages] = useState<IWords[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#0d0d0d' : '#fff',
        flex: 1,
    };

    const addWord = () => {
        if (text.trim().length === 0) {
            return Alert.alert('Please enter a link!');
        }
        const newImage = [...images, { image: text, id: Date.now().toString() }];
        setImages(newImage);
        setText('');
        setModalVisible(!modalVisible);
    };

    const remove = (id: string) => {
        Alert.alert(
            'Are you sure?',
            'This will remove the image from the list.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove', onPress: () => {
                        const newImage = images.filter(word => word.id !== id);
                        setImages(newImage);
                    }
                },
            ]
        );
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View
                style={styles.container}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalView}>
                        <TextInput
                            value={text}
                            placeholder="Enter or paste a link"
                            onChangeText={value => setText(value)}
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => addWord()}>
                            <Text style={styles.buttonText}>Add Image</Text>
                        </TouchableOpacity>
                        <Button color="red" title="Close" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </Modal>

                <WordList images={images} remove={remove} />
                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.pressable}
                >
                    <Text style={styles.addBTN}>
                        +
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        // flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 25,
        justifyContent: 'flex-end',
        // position: 'absolute',
        // bottom: 0,
        // maxHeight: '27%',
        width: '100%',
        marginTop: 'auto',
        backgroundColor: '#212121',
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        width: '100%',
        padding: 10,
        borderWidth: 0,
        borderColor: '#3949ab',
        borderRadius: 5,
        color: '#fff',
        backgroundColor: '#424242',
        fontSize: 20,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#3949ab',
        color: '#fff',
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    pressable: {
        backgroundColor: '#283593',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 200,
        position: 'absolute',
        bottom: -10,
        right: 20,
    },
    addBTN: {
        fontSize: 35,
        color: '#fff',
    }
});

export default App;
