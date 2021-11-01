import React from 'react';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { text, theme } from '../styles';

interface ProductProps {
    id: Number,
    name: String,
    imgUrl: ImageSourcePropType,
    price: Number;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price }) => {
    return (
        <TouchableOpacity style={theme.productCard} activeOpacity={0.8}>
            <Image source={{uri: imgUrl}} style={theme.productImg} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>
                    {name}
                </Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <Text style={text.productPrice}>{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard;