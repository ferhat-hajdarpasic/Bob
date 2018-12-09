import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', errorMessage: null };
    }
    handleSignUp = async () => {
        console.log('Starting signup...');
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            console.log('User created in firebase, navigate to the main screen...');
            this.props.navigation.navigate('AddFavourites');
        } catch (error) {
            console.log(`Firebase signup error ${JSON.stringify(error)}`);
            this.setState({ errorMessage: error.message });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})