import React from 'react';
import { 
    View,
    Text, 
    TouchableOpacity, 
    Image 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';  // yarn add react-native-masked-text
import { text, theme } from '../styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParam } from '../routes';

 export interface ProductProps {
    id: number;
    name: string;
    imgUrl: string;
    price: string;
    role: string;
    description: string;
    route: {params: {id: Number}}
    handleDelete: Function;
}

type navigationScreenProp = StackNavigationProp<StackParam>;

const ProductCard: React.FC<ProductProps> = ({id, name, imgUrl, price, role, handleDelete }) => {

    const navigation = useNavigation<navigationScreenProp>();
    return (
        <TouchableOpacity 
            style={theme.productCard} 
            activeOpacity={0.8}
            onPress={() => role ? "" : navigation.navigate("ProductDetails", { id })}
            >
            <Image source={{ uri: imgUrl }} style={theme.productImg} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>
                    {name}
                </Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <TextInputMask 
                        type={"money"}
                        options={{
                            precision: 2,
                            separator: ",",
                            delimiter: ".",
                            unit: "",
                            suffixUnit: ""
                        }}
                        value={price}
                        editable={false}
                        style={text.productPrice}
                    />
                    {/*<Text style={text.productPrice}>{price}</Text>*/}
                </View>
                {
                    role === "admin" && (
                        <View style={theme.buttonContainer}>
                            <TouchableOpacity style={theme.deleteBtn} onPress={() => handleDelete(id)}>
                                <Text style={text.deleteText}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.editBtn}>
                                <Text style={text.editText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>
        </TouchableOpacity>
    )
}

export default ProductCard;