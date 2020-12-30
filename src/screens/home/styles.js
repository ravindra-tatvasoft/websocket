import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

export default StyleSheet.create({
    root: {
        flex :1 ,
        backgroundColor:'white',
        padding : 10,
    },
    txtLocation :{
        fontSize : 15,
    },
    inputLocation :{
        height: 40, borderColor: 'gray', borderWidth: 1,
        paddingHorizontal : 10,marginTop : 10,
    },
    buttnRoot:{
        backgroundColor: '#5DADE2',borderRadius :8,
        alignItems: 'center', paddingHorizontal: 10, paddingVertical: 12
    },
    btnTxt:{
        color:'white',
        fontSize : 14,
        fontWeight :'bold',
    },
    txtError:{
        color:'red',
        fontSize:12
    },
    btnSend :{
        marginTop:15,
    },
    flex1:{flex:1},
    btnConnectRoot :{
        flexDirection: 'row', marginTop: 10
    },
    txtLogs :{
        borderColor:'gray',borderWidth :1,padding:5,height:150,marginTop :10
    },
    rootLog:{
        flexDirection: 'row',marginTop: 15 ,alignItems:'center'
    }
});
