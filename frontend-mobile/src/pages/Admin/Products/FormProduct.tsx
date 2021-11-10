import { parse, stringify } from 'query-string';
import React, { useEffect, useState }from 'react';
import Toast from 'react-native-tiny-toast';   // yarn add react-native-tiny-toast

import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    Image,
    Modal, 
    TextInput, 
    ActivityIndicator,
    Alert
} from 'react-native';

import { TextInputMask } from 'react-native-masked-text';
import arrow from '../../../assets/leftArrow.png';
import { createProduct, getCategories } from '../../../services';
import { theme, text } from '../../../styles';

interface FormProductProps {
    setScreen: Function;
}


const FormProduct: React.FC<FormProductProps> = (props) => {
    const [ loading, setLoading ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ categories, setCategories ] = useState([])
    const [ showCategories, setShowCategories ] = useState(false);
    const [ product, setProduct ] = useState({
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        categories: [],
    });

    function handleSave() {
        !edit && newProduct();
    }

    async function newProduct() {
        setLoading(true);
        const cat = replaceCategory();
        const data = {
            ...product,
            price: getRaw(),
            categories: [
                {
                    id: cat,
                },
            ],
        };
        try {
            await createProduct(data);
            Toast.showSuccess("Produto salvo com sucesso!")
        } catch (res) {
            Toast.show("Erro ao salvar...")
        }
        setLoading(false);
    }

    function replaceCategory() {
        const cat = categories.find((category) => category.name === product.categories);
        return cat.id;
    }

    async function loadCategories() {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data.content);
        setLoading(false);
    }

    function getRaw(){
        const str = product.price;
        const res = str.slice(2).replace(/\./g, "").replace(/./g, ".");
        return res;
    }

    useEffect(() => {
        loadCategories();
    }, [])
    
    const { setScreen } = props;

    return (
        <View style={theme.formContainer}>
            {
                loading ? <ActivityIndicator size="large" /> :
                <View style={theme.formCard}>
                    <ScrollView>
                    
                    <Modal 
                        visible={showCategories} 
                        animationType="fade" 
                        transparent={true} 
                        presentationStyle="overFullScreen">
                        <View style={theme.modalContainer}>
                            <ScrollView contentContainerStyle={theme.modalContent}>
                                {categories.map((cat) => (
                                    <TouchableOpacity
                                        style={theme.modalItem}
                                        key={cat.id} 
                                        onPress={() => {
                                        setProduct({ ...product, categories: cat.name });
                                        setShowCategories(!showCategories)
                                    }}>
                                        <Text>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </Modal>
                    <TouchableOpacity 
                        onPress={() => setScreen("products")}
                        style={theme.goBackContainer}
                        >
                        <Image source={arrow} />
                        <Text style={text.goBackText}>Voltar</Text>
                    </TouchableOpacity>

                    <TextInput 
                        placeholder="Nome do produto" 
                        style={theme.formInput}
                        value={product.name}
                        onChangeText={(event) => setProduct({...product, name: event})}
                        /> 

                    <TouchableOpacity 
                        onPress={() => setShowCategories(!showCategories)}
                        style={theme.selectInput}
                        >
                        <Text style={product.categories.length === 0 ? { color: "#cecece" } : { color: "#000000" }}>
                            {
                                product.categories.length === 0 ? 'Escolha uma categoria' : product.categories
                            }
                        </Text>
                    </TouchableOpacity>

                    <TextInputMask 
                        type={"money"}
                        placeholder="Preço"
                        style={theme.formInput}
                        value={product.price}
                        onChangeText={(event) => setProduct({ ...product, price: event})}
                    />

                    <TouchableOpacity activeOpacity={0.8} style={theme.uploadBtn}>
                        <Text style={text.uploadText}>Carregar imagem</Text>
                    </TouchableOpacity>
                    <Text style={text.fileSiza}>
                        As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb.
                    </Text>
                    <TextInput 
                        multiline placeholder="Descrição" 
                        style={theme.textArea}
                        value={product.description}
                        onChangeText={(event) => setProduct({ ...product, description: event })}
                        />
                    <View style={theme.buttonContainer}>

                        <TouchableOpacity 
                            style={theme.deleteBtn}
                            onPress={() => {
                                Alert.alert("Deseja cancelar?", "Os dados não serão salvos!", [
                                    {
                                        text: "Voltar",
                                        style: "cancel",
                                    },
                                    {
                                        text: "Confirmar",
                                        onPress: () => setScreen("products"),
                                        style: "default",
                                    }
                                ])
                            }}
                            >
                            <Text style={text.deleteText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={theme.saveBtn}
                            onPress={() => handleSave()}
                            >
                            <Text style={text.saveText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </View>
            }

        </View>
    )
}

export default FormProduct;