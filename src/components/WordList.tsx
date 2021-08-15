import React, { FC } from 'react';
import { FlatList, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IWords } from '../../App';

const logo = require('../assets/empty_box.png');

const renderItem = (item: IWords, remove: Function): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => remove(item.id)}>
            <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
    )
}

const empty = (): JSX.Element => {
    return (
        <View style={styles.empty}>
            <Image
                style={styles.noImage}
                source={logo}
            />
            <Text style={styles.noImageText}>No images found</Text>
        </View>
    )
}

const WordList: FC<IWords> = ({ images, remove }) => {
    const sortedImages = images!.sort((a, b) => b.id!.localeCompare(a.id!));
    return (
        <FlatList
            style={styles.list}
            data={sortedImages}
            keyExtractor={item => item.id!}
            renderItem={({ item }) => renderItem(item, remove!)}
            ListEmptyComponent={() => empty()}
        />
    );
}


const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    list: {
        flex: 1,
        padding: 15,
        width: '100%',
        backgroundColor: '#0d0d0d',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    empty: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImage: {
        height: 90,
        width: 90,
        marginTop: 20,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    noImageText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 20,
    },
});

export default WordList;
