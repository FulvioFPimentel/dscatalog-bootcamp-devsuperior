import React from 'react';
import { 
    View,
    Text, 
    ImageSourcePropType, 
    TouchableOpacity, 
    Image 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { text, theme } from '../styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParam } from '../routes';

interface ProductProps {
    id: Number,
    name: String,
    imgUrl: ImageSourcePropType,
    price: Number;
}

type navigationScreenProp = StackNavigationProp<StackParam>;

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price }) => {

    const navigation = useNavigation<navigationScreenProp>();
    return (
        <TouchableOpacity 
            style={theme.productCard} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ProductDetails", { id })}
            >
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