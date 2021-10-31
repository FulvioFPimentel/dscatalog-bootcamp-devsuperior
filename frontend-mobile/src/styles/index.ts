import { StyleSheet } from "react-native"

const colors = {
    white: "#ffffff",
    lightGray: "#f2f2f2",
    mediumGray: "#9E9E9E",
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
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent: "space-around"
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
})

export { colors, theme, text };