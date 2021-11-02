import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get('window').width

const colors = {
    white: "#ffffff",
    lightGray: "#f2f2f2",
    mediumGray: "#9E9E9E",
    borderGray: "#E1E1E1",
    darkGray: "#263238",
    black: "#000000",
    primary: "#407BEE",
    secondary: "#33569B",
    bluePill: "#407BFF61",
    red: "#DF5753",
}


const text = StyleSheet.create({
    regular:{
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: colors.mediumGray,
    },
    bold: {
        fontSize: 26, 
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: colors.darkGray,
    },
    primaryText: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: colors.white,
        marginLeft: 30,
    },

    productName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    currency: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray,
        marginRight: 4,
    },

    productPrice: {
        fontSize: 30,
        color: colors.primary,
        fontWeight: "bold",
    },

    goBackText: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: colors.darkGray,
        marginLeft: 16,
    },

    productDetailsName: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        color: colors.darkGray,
    },

    productDescription: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray,
    },
})

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    card: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent: "space-around",
    },

    draw: {
        width: 313,
        height: 225,
    },

    textContainer: {
        paddingHorizontal: 25,
    },
    primaryButton: {
        width: 290,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    arrowContainer:{
        width: 50,
        height: 50,
        backgroundColor:colors.secondary,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    // Product Card

    scrollContainer: {
        padding: 10,
    },

    productCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 10,
        padding: 20,
    },

    productDescription: {
        width: "100%",
        padding: 10,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
    },

    priceContainer: {
        flexDirection: "row",
        marginTop: 10,
    },

    productImg: {
        width: 140,
        height: 140,
        margin: 16,
    },

    // Search input
    inputContainer: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        marginVertical: 12.5,
        paddingVertical: 10,
    },
    searchInput: {
        width: "90%",
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderGray,
    },

    // Product Details
    detailsContainer: {
        backgroundColor: colors.white,
        padding: 20,
    },

    detailCard: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: "space-around",
        padding: 20,
    },

    goBackContainer: {
        width: 290,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 10,
    },

    productImageContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightGray,
        alignItems: 'center',
        borderRadius: 20,
    },

    productImage: {
        width: 220,
        height: 220,
    },
    
    scrollTextContainer: {
        marginVertical: 20,
        padding: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray
    },
})

const nav = StyleSheet.create({
    leftText: {
        color:colors.white,
        fontWeight: "bold",
        marginLeft: 20,
    },

    drawer: {
        marginRight: 20,
    },

    options: {
        width: deviceWidth,
        height: 150,
        backgroundColor: colors.primary,
        marginTop: 150,
        marginRight: -20,
        padding: 20,    
        justifyContent: "space-between",
    },

    option: {
        paddingVertical: 6,
    },

    textOption: {
        color: colors.white,
        textTransform: "uppercase",
    },

    textActive: {
        fontWeight: "bold",
    }
})
export { colors, theme, text, nav };